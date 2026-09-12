import { speechTextFromBody } from "@/lib/text";
import {
  NoopAudioEngine,
  type AudioEngine,
  type SpeakPageOptions,
} from "./engine";

export class SpeechSynthesisAudioEngine implements AudioEngine {
  private rate = 0.9;
  private utterance: SpeechSynthesisUtterance | null = null;
  speaking = false;
  paused = false;

  async speakPage(text: string, options?: SpeakPageOptions): Promise<void> {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      options?.onError?.(new Error("Speech synthesis is not available."));
      return;
    }

    this.cancel();

    const utterance = new SpeechSynthesisUtterance(speechTextFromBody(text));
    utterance.rate = this.rate;
    utterance.pitch = 1;
    this.utterance = utterance;
    this.speaking = true;
    this.paused = false;

    utterance.onboundary = (event) => {
      if (event.name === "word" || event.charIndex >= 0) {
        options?.onBoundary?.(event.charIndex);
      }
    };

    return new Promise((resolve) => {
      utterance.onend = () => {
        this.speaking = false;
        this.paused = false;
        this.utterance = null;
        options?.onEnd?.();
        resolve();
      };
      utterance.onerror = (event) => {
        this.speaking = false;
        this.paused = false;
        this.utterance = null;
        if (event.error !== "canceled" && event.error !== "interrupted") {
          options?.onError?.(new Error(event.error || "Speech failed."));
        }
        resolve();
      };
      window.speechSynthesis.speak(utterance);
    });
  }

  pause(): void {
    if (typeof window === "undefined" || !this.speaking || this.paused) {
      return;
    }
    window.speechSynthesis.pause();
    this.paused = true;
  }

  resume(): void {
    if (typeof window === "undefined" || !this.speaking || !this.paused) {
      return;
    }
    window.speechSynthesis.resume();
    this.paused = false;
  }

  cancel(): void {
    if (typeof window === "undefined") {
      return;
    }
    this.speaking = false;
    this.paused = false;
    this.utterance = null;
    window.speechSynthesis.cancel();
  }

  setRate(rate: number): void {
    this.rate = rate;
    if (this.utterance) {
      this.utterance.rate = rate;
    }
  }
}

export function createAudioEngine(): AudioEngine {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    return new SpeechSynthesisAudioEngine();
  }
  return new NoopAudioEngine();
}
