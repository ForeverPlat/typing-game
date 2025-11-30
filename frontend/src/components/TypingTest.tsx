import { useCallback, useEffect, useRef, useState } from "react"
import Word from "./Word"
import type { LetterStatus, WordHandle } from "../types";
import TypingCursor from "./TypingCursor";
import { createSearchParams, useNavigate } from "react-router-dom";

const TypingTest = ({ resetToken }: { resetToken: number }) => {

    const [text] = useState("hello to the world");
    const [words] = useState<string[]>(text.split(" "));
    const [wordIndex, setWordIndex] = useState(0);
    const [letterIndex, setLetterIndex] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const wordComponentRefs = useRef<(WordHandle | null)[]>([]);
    const cursorRef = useRef<HTMLDivElement | null>(null);

    const navigate = useNavigate();

    const totalLetters = text?.replaceAll(" ", "").length;

    const handleReset = () => {
        for (const wordRef of wordComponentRefs.current) {
            wordRef?.setPending();
        }
    }

    useEffect(() => {
        handleReset();
        resetTimer();
    }, [resetToken])

    useEffect(() => {
        let timeInterval;
        if (isRunning) {
            timeInterval = setInterval(() => {
                setElapsedTime((prevTime) => prevTime + 1000)
            }, 1000);
        }
        console.log(elapsedTime);
    }, [isRunning])

    const startTimer = () => setIsRunning(true);
    const stopTimer = () => setIsRunning(false);
    const resetTimer = () => {
        setIsRunning(false);
        setElapsedTime(0);
        setWordIndex(0);
        setLetterIndex(0);
        setHasFinished(false);
    }

    const getAccuracy = () => {
        let incorrect = 0;

        for (const wordRef of wordComponentRefs.current) {
            if (!wordRef) continue;

            const lettersCount = wordRef.getLetterCount();

            for (let i = 0; i < lettersCount; i++) {
                const letterRef = wordRef.getLetter(i);
                if (!letterRef) continue;

                letterRef.getStatus() === "incorrect" ? incorrect++ : null;
            }
        }
        return Math.round((totalLetters - incorrect)/(totalLetters) * 100);
    }

    const getWpm = () => {
        const accuracy = getAccuracy();
        const time = elapsedTime/60000;
        const correctChars = totalLetters * accuracy;

        return Math.min(Math.round((correctChars/ 5) / time), 300);
    }

    const endGame = () => {
        setHasFinished(true);
        stopTimer();

        // const acc = getAccuracy();
        // const wpm = getWpm();
        // const charCount = totalLetters;

        const result = {
            accuracy: getAccuracy(),
            wpm: getWpm(),
            charCount: totalLetters,
            duration: elapsedTime
        };

        const resultString = encodeURIComponent(JSON.stringify(result));

        navigate({
            pathname: '/result',
            search: `?result=${resultString}`    // come back and check this
        });
        
        console.log("Game over");
        console.log(elapsedTime);
        console.log("acc ",getAccuracy());
        console.log("wpm", getWpm());
    }

    const setLetterStatus = (wordI: number, letterI: number, key: string, force?: LetterStatus ) => {
        const wordComponent = wordComponentRefs.current[wordI];
        const letterComponent = wordComponent?.getLetter(letterI);
        if (!letterComponent) return;

        if (force) {
            letterComponent.setStatus(force);
            return;
        }

        const word = words[wordI][letterI];
        const status = word === key ? "correct" : "incorrect";
        letterComponent.setStatus(status);
    }


    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        const key = event.key;

        if (hasFinished) return;

        const lettersTyped = words
            .slice(0, wordIndex)
            .reduce((sum, word) => sum + word.length, 0) + letterIndex

        if (!isRunning && (/^[a-zA-Z]$/.test(event.key) || event.key === " ")) {
            startTimer();
        }

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
            const isLastLetter = lettersTyped === totalLetters - 1

            setLetterIndex((prevLetterIndex) => {
                if (prevLetterIndex >= words[wordIndex].length) return prevLetterIndex;

                setLetterStatus(wordIndex, prevLetterIndex, key)
                return prevLetterIndex + 1;
            });

            if (isLastLetter) {
                endGame();
            }
            return;
        }
    }, [ wordIndex, letterIndex, words, isRunning, text, elapsedTime ])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown])

    useEffect(() => {
        console.log(letterIndex);
    }, [letterIndex])

    useEffect(() => {
        const wordComponent = wordComponentRefs.current[wordIndex];
        const container = document.getElementById("typing-test");

        let rect = null;

        if (letterIndex < words[wordIndex].length) {
            const letter = wordComponent?.getLetter(letterIndex);
            rect = letter?.getRect() ?? null;
        } else {
            rect = wordComponent?.getEndRect() ?? null;
        }

        if (!rect || !cursorRef.current || !container) return;
        
        const containerRect = container.getBoundingClientRect();
        const x = rect.left - containerRect.left;
        const y = rect.top - containerRect.top;

        cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }, [wordIndex, letterIndex])

    useEffect(() => {
        if (!cursorRef.current) return;

        if (letterIndex > 0 || wordIndex > 0) {
            cursorRef.current.classList.add("no-blink");
        } else {
            cursorRef.current.classList.remove("no-blink");
        }
    }, [letterIndex]);

  return (
    <div id="typing-test" className="typing-test">
        <TypingCursor ref={cursorRef} />
        {words.map((word, i) => (
            <Word 
                key={`${i}-${resetToken}`} 
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