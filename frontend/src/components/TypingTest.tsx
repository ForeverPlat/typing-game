import { useCallback, useEffect, useRef, useState } from "react"
import Word from "./Word"
import type { WordHandle } from "../types";

const TypingTest = () => {

    const [text, setText] = useState("Hello World");
    const [words, setWords] = useState<string[]>(text.split(" "));
    const [wordIndex, setWordIndex] = useState(0);
    const [letterIndex, setLetterIndex] = useState(0);

    const wordComponentRefs = useRef<(WordHandle | null)[]>([]);
    const letterIndexRef = useRef(0);
    const wordIndexRef = useRef(0);

    // wordComponentRefs.current = Array(words.length).fill(null);

    // useEffect(() => {
    //     wordComponentRefs.current = Array(words.length).fill(null);
    // }, [])

    useEffect(() => {
        letterIndexRef.current = letterIndex
    }, [letterIndex])

    useEffect(() => {
        wordIndexRef.current = wordIndex 
    }, [wordIndex])

    // const currentLetterIndex = letterIndexRef.current;
    // const currentWordIndex = wordIndexRef.current;

    const updateLetterIndex = (key: string) => {
        if (key === "Backspace") {
            setLetterIndex(prevLetterIndex => Math.max(0, prevLetterIndex - 1));
        } else if (/^[a-zA-Z]$/.test(key)) {
            setLetterStatus(key);
            setLetterIndex(prevLetterIndex => prevLetterIndex + 1);
        } else if (key === " ") {
            setLetterStatus(key);
            setWordIndex(prevWordIndex => prevWordIndex + 1)
            setLetterIndex(0);
        }
        currentLetter();
        
    }


    const isCorrectLetter = (key: String): boolean => {
        const currWord = words[wordIndexRef.current];
        const currLetter = currWord[letterIndexRef.current];

        if (key === currLetter)
            return true;
        return false;
    }

    const setLetterStatus = (key: string) => {
        const currWordComponent = wordComponentRefs.current[wordIndexRef.current];

        if (isCorrectLetter(key)) {
            currWordComponent?.getLetter(letterIndexRef.current)?.setLetterStatus("correct");
        } else {
            currWordComponent?.getLetter(letterIndexRef.current)?.setLetterStatus("incorrect");
        }

    }

    const currentLetter = () => {
        const currWord = words[wordIndex];
        const currLetter = currWord[letterIndexRef.current];

        console.log("currLetter: ", currLetter);
    }
    
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        updateLetterIndex(event.key);
    }, [])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown])

    useEffect(() => {
        console.log(letterIndex);
    }, [letterIndex])

  return (
    <>
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
    </>
  )
}

export default TypingTest