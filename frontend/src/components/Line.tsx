import { forwardRef, useImperativeHandle, useRef } from "react";
import Word from "./Word";
import type { LineHandle, LineProps, WordHandle } from "../types";
import "../styles/line.css"; // optional but recommended

const Line = forwardRef<LineHandle, LineProps>(({ words, indent, resetToken }, ref) => {
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
            <div className="indent" style={{ width: `${indent * 2}rem` }} />
            {words.map((word, i) => (
                <Word
                    key={`${i}-${resetToken}`}
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
