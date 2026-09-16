"use client";

import { FocusWord } from "@/components/reader/FocusWord";
import { ReaderTypography } from "@/components/reader/ReaderTypography";
import { cn } from "@/lib/cn";
import type { StoryPage as StoryPageModel } from "@/lib/stories/types";
import { isFocusWord, tokenizeLine, wordRangeAt } from "@/lib/text";

export function StoryPage({
  page,
  title,
  followCharIndex,
  speechText,
}: {
  page: StoryPageModel;
  title: string;
  followCharIndex: number | null;
  speechText: string;
}) {
  const activeRange =
    followCharIndex === null ? null : wordRangeAt(speechText, followCharIndex);
  const lines = page.body.split("\n");
  let spokenOffset = 0;

  return (
    <article className="mx-auto w-full max-w-reader">
      <h1 className="font-display mb-6 text-xl font-semibold tracking-tight text-text-primary sm:text-2xl">
        {title}
      </h1>
      <ReaderTypography>
        {lines.map((line, lineIndex) => {
          const trimmed = line.trim();
          const tokens = tokenizeLine(trimmed);
          const lineStart = spokenOffset;
          spokenOffset += trimmed.length + (lineIndex < lines.length - 1 ? 1 : 0);

          return (
            <p key={`${page.id}-${lineIndex}`}>
              {tokens.map((token, tokenIndex) => {
                if (!token.isWord) {
                  return (
                    <span key={`${token.start}-${tokenIndex}`}>{token.value}</span>
                  );
                }

                const spokenStart = lineStart + token.start;
                const spokenEnd = lineStart + token.end;
                const following =
                  activeRange !== null &&
                  spokenStart < activeRange.end &&
                  spokenEnd > activeRange.start;

                const word = isFocusWord(token.value, page.focusWords) ? (
                  <FocusWord>{token.value}</FocusWord>
                ) : (
                  token.value
                );

                return (
                  <span
                    key={`${token.start}-${tokenIndex}`}
                    className={cn(following && "follow-word")}
                  >
                    {word}
                  </span>
                );
              })}
            </p>
          );
        })}
      </ReaderTypography>
    </article>
  );
}
