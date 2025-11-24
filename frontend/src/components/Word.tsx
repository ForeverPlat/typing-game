import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { LetterHandle, WordHandle, WordProps, WordStatus } from "../types";
import Letter from "./Letter";
import '../styles/word.css';


const Word = forwardRef<WordHandle, WordProps>(({ word }, ref)  => {

  const [status, setStatus] = useState<WordStatus>("pending");
  const [letters, setLetters] = useState<string[]>(word.split(""));

  const letterComponentRefs = useRef<(LetterHandle | null)[]>([]);
  
  // useEffect(() => {
  //   letterComponentRefs.current = Array(letters.length).fill(null);
  // }, [])

  useImperativeHandle(ref, () => ({
    getWord: () => word,
    getLetter: (index: number) => letterComponentRefs.current[index],
    setWordStatus: (status: WordStatus) => setStatus(status),
    getEndRect: () => {
      const lastLetter = letterComponentRefs.current[letters.length - 1];
      if (!lastLetter) return null;
      
      const rect = lastLetter.getRect();
      if (!rect) return null;
      
      return {
        left: rect.right,
        top: rect.top,
      };
    }
  }));

  return (
    <div className="word" id="word">
        {
            letters.map((letter, i) => (
                <Letter 
                  key={i}
                  letter={letter} 
                  status="pending"
                  ref={(element) => {
                    letterComponentRefs.current[i] = element
                  }}
                />
            ))
        }
    </div>
  )
})

export default Word