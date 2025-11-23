import { useCallback, useEffect, useRef, useState } from "react"
import Word from "./Word"

const TypingTest = () => {

    const [text, setText] = useState("Hello World");
    const [words, setWords] = useState<string[]>(text.split(" "));
    const [wordIndex, setWordIndex] = useState(0);
    const [letterIndex, setLetterIndex] = useState(0);

    const letterIndexRef = useRef(0);
    const wordIndexRef = useRef(0);

    useEffect(() => {
        letterIndexRef.current = letterIndex
    }, [letterIndex])

    useEffect(() => {
        wordIndexRef.current = wordIndex 
    }, [wordIndex])

    const updateLetterIndex = (key: string) => {
        if (key === "Backspace") {
            setLetterIndex(prevLetterIndex => Math.max(0, prevLetterIndex - 1));
        } else if (/^[a-zA-Z]$/.test(key)) {
            setLetterIndex(prevLetterIndex => prevLetterIndex + 1);
        } else if (key === " ") {
            setWordIndex(prevWordIndex => prevWordIndex + 1)
        }
        currentLetter()
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
            <Word key={i} word={word} />
        ))}
    </>
  )
}

export default TypingTest