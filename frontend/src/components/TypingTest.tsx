import { useCallback, useEffect, useRef, useState } from "react"
import Word from "./Word"
import type { LetterStatus, WordHandle } from "../types";

const TypingTest = () => {

    const [text] = useState("hello world");
    const [words] = useState<string[]>(text.split(" "));
    const [wordIndex, setWordIndex] = useState(0);
    const [letterIndex, setLetterIndex] = useState(0);

    const wordComponentRefs = useRef<(WordHandle | null)[]>([]);

    // const currentLetterIndex = letterIndexRef.current;
    // const currentWordIndex = wordIndexRef.current;

    // const isCorrectLetter = (key: String): boolean => {
    //     const currWord = words[wordIndexRef.current];
    //     const currLetter = currWord[letterIndexRef.current];

    //     if (key === currLetter)
    //         return true;
    //     return false;
    // }

    const setLetterStatus = (wordI: number, letterI: number, key: string, force?: LetterStatus ) => {
        const wordComponent = wordComponentRefs.current[wordI];
        const letterComponent = wordComponent?.getLetter(letterI);
        if (!letterComponent) return;

        if (force) {
            letterComponent.setLetterStatus(force);
            return;
        }

        const word = words[wordI][letterI];
        const status = word === key ? "correct" : "incorrect";
        letterComponent.setLetterStatus(status);
    }

    // const currentLetter = () => {
    //     const currWord = words[wordIndexRef.current];
    //     const currLetter = currWord[letterIndexRef.current];

    //     console.log("currLetter: ", currLetter);
    // }
    
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        const key = event.key;

        if (key === "Backspace") {
            setLetterIndex(prevLetterIndex => {
                if (wordIndex === 0 && prevLetterIndex === 0) {
                    return 0;
                }

                if (prevLetterIndex === 0) {
                    const newWordIndex = wordIndex - 1;
                    const newLetterIndex = words[newWordIndex].length;

                    setWordIndex(newWordIndex);
                    return newLetterIndex;
                }

                const newLetterIndex = prevLetterIndex - 1;
                setLetterStatus(wordIndex, newLetterIndex, "", "pending");
                return newLetterIndex;
            });
            return;
        }

        if (key == " ") {
            setWordIndex((prevWordIndex) => prevWordIndex + 1);
            setLetterIndex(0)
            return;
        }

        if (/^[a-zA-Z]$/.test(key)) {
            setLetterIndex((prevLetterIndex) => {
                if (prevLetterIndex >= words[wordIndex].length) return prevLetterIndex;

                setLetterStatus(wordIndex, prevLetterIndex, key)
                return prevLetterIndex + 1;
            })
            return;
        }
    }, [wordIndex, words])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown])

    useEffect(() => {
        console.log(letterIndex);
    }, [letterIndex])

  return (
    <div id="typing-test" className="typing-test">
        {words.map((word, i) => (
            <Word 
                key={i} 
                word={word}
                status="pending"
                ref={(element) => {
                    wordComponentRefs.current[i] = element
                }}
            />
        ))}
    </div>
  )
}

export default TypingTest