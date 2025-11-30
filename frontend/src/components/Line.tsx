import { forwardRef, useImperativeHandle, useRef } from "react";
import Word from "./Word";
import type { LineHandle, LineProps, WordHandle } from "../types";
import "../styles/line.css"; // optional but recommended

const Line = forwardRef<LineHandle, LineProps>(({ words }, ref) => {
  const wordRefs = useRef<(WordHandle | null)[]>([]);

  useImperativeHandle(ref, () => ({
    getWord: (wordIndex: number) => wordRefs.current[wordIndex] ?? null,
    getWordCount: () => words.length,
    setPending: () => {
      for (const wordRef of wordRefs.current) {
        wordRef?.setPending();
      }
    },
  }));

  return (
    <div className="line">
      {words.map((word, i) => (
        <Word
          key={i}
          word={word}
          status="pending"
          ref={(el) => {
            wordRefs.current[i] = el;
          }}
        />
      ))}
    </div>
  );
});

export default Line;
