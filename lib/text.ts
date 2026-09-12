export type TextToken = {
  value: string;
  isWord: boolean;
  start: number;
  end: number;
};

const TOKEN_PATTERN = /(\p{L}+(?:['’]\p{L}+)?)/gu;

export function tokenizeLine(line: string): TextToken[] {
  const tokens: TextToken[] = [];
  let last = 0;

  for (const match of line.matchAll(TOKEN_PATTERN)) {
    const start = match.index ?? 0;
    if (start > last) {
      tokens.push({
        value: line.slice(last, start),
        isWord: false,
        start: last,
        end: start,
      });
    }
    tokens.push({
      value: match[0],
      isWord: true,
      start,
      end: start + match[0].length,
    });
    last = start + match[0].length;
  }

  if (last < line.length) {
    tokens.push({
      value: line.slice(last),
      isWord: false,
      start: last,
      end: line.length,
    });
  }

  return tokens;
}

export function normalizeWord(value: string): string {
  return value.toLowerCase().replace(/['’]/g, "'");
}

export function isFocusWord(word: string, focusWords: string[] = []): boolean {
  const needle = normalizeWord(word);
  return focusWords.some((focus) => normalizeWord(focus) === needle);
}

export function wordRangeAt(
  text: string,
  charIndex: number,
): { start: number; end: number } | null {
  if (charIndex < 0 || text.length === 0) {
    return null;
  }

  const clamped = Math.min(charIndex, Math.max(text.length - 1, 0));
  let start = clamped;
  let end = clamped;

  const isWordChar = (index: number) => {
    const ch = text[index];
    return ch ? /\p{L}/u.test(ch) || ch === "'" || ch === "’" : false;
  };

  if (!isWordChar(clamped)) {
    let cursor = clamped;
    while (cursor < text.length && !isWordChar(cursor)) {
      cursor += 1;
    }
    if (cursor >= text.length) {
      return null;
    }
    start = cursor;
    end = cursor;
  }

  while (start > 0 && isWordChar(start - 1)) {
    start -= 1;
  }
  while (end < text.length && isWordChar(end)) {
    end += 1;
  }

  return { start, end };
}

export function speechTextFromBody(body: string): string {
  return body
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ");
}
