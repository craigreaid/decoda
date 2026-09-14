"use client";

import { BrandLink } from "@/components/brand/BrandLink";
import { useBrand } from "@/components/brand/BrandThemeProvider";
import { AudioControl } from "@/components/reader/AudioControl";
import { Disclaimer } from "@/components/reader/Disclaimer";
import { PageNav } from "@/components/reader/PageNav";
import { ParentSettingsSheet } from "@/components/reader/ParentSettingsSheet";
import { PraiseComplete } from "@/components/reader/PraiseComplete";
import { StoryPage } from "@/components/reader/StoryPage";
import { BrandMark } from "@/components/ui/BrandMark";
import { createAudioEngine } from "@/lib/audio";
import { withBrandQuery } from "@/lib/href";
import type { Story } from "@/lib/stories/types";
import { speechTextFromBody } from "@/lib/text";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function ReaderShell({
  story,
  initialPage,
}: {
  story: Story;
  initialPage: number;
}) {
  const { brand, prefs } = useBrand();
  const searchParams = useSearchParams();
  const brandQuery = searchParams.get("brand");
  const [page, setPage] = useState(initialPage);
  const [complete, setComplete] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [followCharIndex, setFollowCharIndex] = useState<number | null>(null);
  const [liveMessage, setLiveMessage] = useState(
    `Page ${initialPage} of ${story.pages.length}. ${story.title}.`,
  );
  const engineRef = useRef(createAudioEngine());
  const pageCount = story.pages.length;
  const currentPage = story.pages[page - 1] ?? story.pages[0];
  const speechText = useMemo(
    () => speechTextFromBody(currentPage?.body ?? ""),
    [currentPage],
  );

  const stopAudio = useCallback(() => {
    engineRef.current.cancel();
    setPlaying(false);
    setPaused(false);
    setFollowCharIndex(null);
  }, []);

  const syncUrl = useCallback(
    (nextPage: number) => {
      const href = withBrandQuery(`/read/${story.slug}?page=${nextPage}`, brandQuery);
      window.history.replaceState(null, "", href);
    },
    [brandQuery, story.slug],
  );

  const goToPage = useCallback(
    (nextPage: number) => {
      const clamped = Math.min(Math.max(nextPage, 1), pageCount);
      stopAudio();
      setComplete(false);
      setPage(clamped);
      syncUrl(clamped);
      setLiveMessage(`Page ${clamped} of ${pageCount}. ${story.title}.`);
    },
    [pageCount, stopAudio, story.title, syncUrl],
  );

  const finishStory = useCallback(() => {
    stopAudio();
    setComplete(true);
    setLiveMessage(`Finished ${story.title}.`);
  }, [stopAudio, story.title]);

  const goNext = useCallback(() => {
    if (page >= pageCount) {
      finishStory();
      return;
    }
    goToPage(page + 1);
  }, [finishStory, goToPage, page, pageCount]);

  const goBack = useCallback(() => {
    if (complete) {
      goToPage(pageCount);
      return;
    }
    if (page > 1) {
      goToPage(page - 1);
    }
  }, [complete, goToPage, page, pageCount]);

  const toggleAudio = useCallback(() => {
    const engine = engineRef.current;
    if (complete) {
      return;
    }
    if (playing && !paused) {
      engine.pause();
      setPaused(true);
      return;
    }
    if (playing && paused) {
      engine.resume();
      setPaused(false);
      return;
    }

    engine.setRate(prefs.speechRate);
    setPlaying(true);
    setPaused(false);
    void engine.speakPage(currentPage.body, {
      onBoundary: (charIndex) => {
        if (prefs.audioFollowAlong) {
          setFollowCharIndex(charIndex);
        }
      },
      onEnd: () => {
        setPlaying(false);
        setPaused(false);
        setFollowCharIndex(null);
      },
    });
  }, [complete, currentPage.body, paused, playing, prefs.audioFollowAlong, prefs.speechRate]);

  useEffect(() => {
    engineRef.current.setRate(prefs.speechRate);
  }, [prefs.speechRate]);

  useEffect(() => {
    if (!prefs.audioFollowAlong) {
      setFollowCharIndex(null);
    }
  }, [prefs.audioFollowAlong]);

  useEffect(() => {
    const engine = engineRef.current;
    return () => {
      engine.cancel();
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (settingsOpen) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (typing) {
        return;
      }

      if (event.key === "Escape") {
        setSettingsOpen(false);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goBack();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
        return;
      }

      if (event.key === "Enter" && target?.tagName !== "BUTTON" && target?.tagName !== "A") {
        event.preventDefault();
        if (complete) {
          window.location.assign(withBrandQuery("/library", brandQuery));
          return;
        }
        goNext();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [brandQuery, complete, goBack, goNext, settingsOpen]);

  return (
    <div className="flex min-h-dvh flex-col bg-canvas text-text-primary">
      <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between gap-2 border-b border-line bg-canvas px-3 sm:px-4">
        <BrandMark name={brand.displayName} href={withBrandQuery("/", brandQuery)} compact />
        <div className="flex items-center gap-2">
          <AudioControl
            playing={playing}
            paused={paused}
            disabled={complete}
            onToggle={toggleAudio}
          />
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="inline-flex min-h-tap min-w-tap items-center justify-center rounded-full border border-line bg-canvas px-3 text-sm font-semibold"
          >
            Settings
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-reader flex-1 flex-col px-4 py-6 sm:px-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <BrandLink
            href="/library"
            className="font-chrome inline-flex min-h-tap items-center text-sm font-semibold text-accent no-underline"
          >
            Library
          </BrandLink>
          <p className="font-chrome text-sm text-muted">Level {story.level}</p>
        </div>

        {complete ? (
          <PraiseComplete title={story.title} />
        ) : (
          <>
            <StoryPage
              page={currentPage}
              title={story.title}
              followCharIndex={followCharIndex}
              speechText={speechText}
            />
            <div className="mt-8">
              <PageNav
                page={page}
                pageCount={pageCount}
                onBack={goBack}
                onNext={goNext}
                onSelect={goToPage}
                nextLabel={page >= pageCount ? "Finish" : "Next"}
              />
            </div>
          </>
        )}

        <div className="mt-8 border-t border-line pt-4">
          <Disclaimer />
        </div>
      </main>

      <ParentSettingsSheet
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveMessage}
      </div>
    </div>
  );
}
