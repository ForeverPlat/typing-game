import { useCallback, useEffect, useRef, useState } from "react"
import Line from "./Line";
import type { Language, LetterStatus, LineHandle, TypingTestProp } from "../types";
import TypingCursor from "./TypingCursor";
import { useNavigate } from "react-router-dom";
import { getText } from '../../utils/generateTypingText'

const TypingTest = ({ resetToken, selectedLanguage }: TypingTestProp) => {

    const [language, setLangauge] = useState<Language>(selectedLanguage);
    
    const [text, setText] = useState(() => getText(language));
    console.log(text);
    

    const extractIndentation = (line: string) => {
        const indentMatch = line.match(/^\t+/); // one or more tabs
        const indent = indentMatch ? indentMatch[0].length : 0;
        const noIndent = line.replace(/^\t+/, "");
        return { indent, noIndent };
    }

    const processText = (text: string) => {
        return text.split("\n").map(rawLine => {
            const { indent, noIndent } = extractIndentation(rawLine);
            return {
                indent,
                words: noIndent.length > 0 ? noIndent.split(" ") : [""]
            };
        });
    };

    const [lines, setLines] = useState(() => processText(text));
    const [lineIndex, setLineIndex] = useState(0);
    const [wordIndex, setWordIndex] = useState(0);
    const [letterIndex, setLetterIndex] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const lineRefs = useRef<(LineHandle | null)[]>([]);
    // const wordComponentRefs = useRef<(WordHandle | null)[]>([]);
    const cursorRef = useRef<HTMLDivElement | null>(null);

    const navigate = useNavigate();

    const totalLetters = lines.reduce( (sum, line) =>
            sum + line.words.reduce((s, w) => s + w.length, 0), 0
    );

    const handleReset = () => {
        for (const lineRef of lineRefs.current) {
            lineRef?.setPending();
        }
    };

    const newText = () => setText(getText(language));

    useEffect(() => {
        handleReset();
        resetTimer();
        newText();
    }, [resetToken])

    useEffect(() => {
        handleReset();
        setLangauge(selectedLanguage)
        setText(getText(selectedLanguage))
    }, [selectedLanguage])

    useEffect(() => {
        setLines(processText(text));
    }, [text]);

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

        for (const lineRef of lineRefs.current) {
        if (!lineRef) continue;

        const wordCount = lineRef.getWordCount();
        for (let wi = 0; wi < wordCount; wi++) {
            const wordRef = lineRef.getWord(wi);
            if (!wordRef) continue;

            const lettersCount = wordRef.getLetterCount();
            for (let li = 0; li < lettersCount; li++) {
            const letterRef = wordRef.getLetter(li);
            if (!letterRef) continue;

            if (letterRef.getStatus() === "incorrect") incorrect++;
            }
        }
        }
        return Math.round(((totalLetters - incorrect) / totalLetters) * 100);
    }

    const getWpm = () => {
        const accuracy = getAccuracy() / 100;
        const time = elapsedTime / 60000;
        const correctChars = totalLetters * accuracy;
        if (time === 0) return 0;
        return Math.min(Math.round((correctChars / 5) / time), 300);
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

    const setLetterStatus = (lineI: number, wordI: number, letterI: number, key: string, force?: LetterStatus ) => {
        const lineComponent = lineRefs.current[lineI];
        const wordComponent = lineComponent?.getWord(wordI);
        const letterComponent = wordComponent?.getLetter(letterI);
        if (!letterComponent) return;

        if (force) {
        letterComponent.setStatus(force);
        return;
        }

        const expectedChar = lines[lineI].words[wordI][letterI];
        const status: LetterStatus = expectedChar === key ? "correct" : "incorrect";
        letterComponent.setStatus(status);
    }


    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        const key = event.key;

        if (hasFinished) return;

        const lettersTypedBeforeCurrentLine = lines
            .slice(0, lineIndex)
            .reduce((sum, lineObj) => sum + lineObj.words
                .reduce((wSum, w) => wSum + w.length, 0),
                0
            );

        const lettersTypedInCurrentLine = lines[lineIndex].words
            .slice(0, wordIndex)
            .reduce((sum, w) => sum + w.length, 0);

        const lettersTyped =
            lettersTypedBeforeCurrentLine + lettersTypedInCurrentLine + letterIndex;

        if ( !isRunning && (key.length === 1 || key === " ")) {
            startTimer();
        }

        if (key === "Backspace") {
            setLetterIndex((prevLetterIndex) => {
            // nothing to delete at very start
            if ( lineIndex === 0 && wordIndex === 0 && prevLetterIndex === 0) {
                return 0;
            }

            // move to previous word / line if at start of word
            if (prevLetterIndex === 0) {
                if (wordIndex > 0) {
                    const newWordIndex = wordIndex - 1;
                    const newLetterIndex =
                        lines[lineIndex].words[newWordIndex].length;

                    setWordIndex(newWordIndex);
                    setLetterStatus(
                        lineIndex,
                        newWordIndex,
                        newLetterIndex - 1,
                        "",
                        "pending"
                    );
                    return newLetterIndex;
                } else if (lineIndex > 0) {
                    const newLineIndex = lineIndex - 1;
                    const lastWordIndex = lines[newLineIndex].words.length - 1;
                    const newLetterIndex =
                        lines[newLineIndex].words[lastWordIndex].length;

                    setLineIndex(newLineIndex);
                    setWordIndex(lastWordIndex);
                    setLetterStatus(
                        newLineIndex,
                        lastWordIndex,
                        newLetterIndex - 1,
                        "",
                        "pending"
                    );
                    return newLetterIndex;
                }
            }

            // normal backspace inside word
            const newLetterIndex = prevLetterIndex - 1;
            setLetterStatus(
                lineIndex,
                wordIndex,
                newLetterIndex,
                "",
                "pending"
            );
            return newLetterIndex;
            });
            return;
        }

        if (key === "Enter") {
            const isLastLine = lineIndex === lines.length - 1;

            if (!isLastLine) {
                setLineIndex(lineIndex + 1);
                setWordIndex(0);
                setLetterIndex(0);
                return;
            }

            endGame();
            return;
        }

        if (key === " ") {
            const wordsInLine = lines[lineIndex].words;
            const isLastWord = wordIndex === wordsInLine.length - 1;

            if (!isLastWord) {
                setWordIndex(wordIndex + 1);
                setLetterIndex(0);
            }
            return;
        }

        if (key.length === 1) {
            const isLastLetter = lettersTyped === totalLetters - 1;

            setLetterIndex((prevLetterIndex) => {
                const currentWord = lines[lineIndex].words[wordIndex];
                if (prevLetterIndex >= currentWord.length) return prevLetterIndex;

                setLetterStatus(lineIndex, wordIndex, prevLetterIndex, key);
                return prevLetterIndex + 1;
            });

            if (isLastLetter) {
                endGame();
            }
            return;
        }
    }, [lineIndex, wordIndex, letterIndex, lines, isRunning, text, elapsedTime, hasFinished])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown])

    useEffect(() => {
        console.log(letterIndex);
    }, [letterIndex])

    useEffect(() => {
        const lineComponent = lineRefs.current[lineIndex];
        const wordComponent = lineComponent?.getWord(wordIndex);
        const container = document.getElementById("typing-test");

        let rect: { left: number; top: number } | DOMRect | null = null;

        const currentWord = lines[lineIndex].words?.[wordIndex];

        if (!currentWord || !wordComponent) return;

        if (letterIndex < currentWord.length) {
            const letter = wordComponent.getLetter(letterIndex);
            rect = letter?.getRect() ?? null;
        } else {
            rect = wordComponent.getEndRect();
        }

        if (!rect || !cursorRef.current || !container) return;

        const containerRect = container.getBoundingClientRect();
        const x = rect.left - containerRect.left;
        const y = rect.top - containerRect.top;

        cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }, [lineIndex, wordIndex, letterIndex, lines])

    useEffect(() => {
        if (!cursorRef.current) return;

        if (letterIndex > 0 || wordIndex > 0 || lineIndex > 0) {
            cursorRef.current.classList.add("no-blink");
        } else {
            cursorRef.current.classList.remove("no-blink");
        }
    }, [letterIndex, wordIndex, lineIndex]);

  return (
    <div id="typing-test" className="typing-test">
        <TypingCursor ref={cursorRef} />

        {lines.map((line, idx) => (
            <Line
                key={`${idx}-${resetToken}`}
                words={line.words}
                indent={line.indent}
                resetToken={resetToken}
                ref={(el) => {
                    lineRefs.current[idx] = el;
                }}
            />
        ))}


    </div>
  )
}

export default TypingTest