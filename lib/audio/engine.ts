export type SpeakPageOptions = {
  onBoundary?: (charIndex: number) => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
};

export interface AudioEngine {
  speakPage(text: string, options?: SpeakPageOptions): Promise<void>;
  pause(): void;
  resume(): void;
  cancel(): void;
  setRate(rate: number): void;
  readonly speaking: boolean;
  readonly paused: boolean;
}

export class NoopAudioEngine implements AudioEngine {
  private rate = 0.9;
  speaking = false;
  paused = false;

  async speakPage(_text: string, options?: SpeakPageOptions): Promise<void> {
    this.speaking = false;
    this.paused = false;
    options?.onEnd?.();
  }

  pause(): void {
    this.paused = this.speaking;
  }

  resume(): void {
    this.paused = false;
  }

  cancel(): void {
    this.speaking = false;
    this.paused = false;
  }

  setRate(rate: number): void {
    this.rate = rate;
  }
}
