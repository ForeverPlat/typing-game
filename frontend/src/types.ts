import type { ReactElement } from "react"

export type LetterStatus = "pending" | "correct" | "incorrect" 

export type LetterProps = {
    letter: string,
    status: LetterStatus,
}

export type WordStatus = "pending" | "correct" | "incorrect" | "incomplete"

export type WordProps = {
    word: string,
    status: WordStatus
}

export type WordHandle = {
    getWord: () => string,
    getLetter: (index: number) => LetterHandle | null, 
    setWordStatus: (status: WordStatus) => void
    getEndRect: () => { left: number; top: number } | null
}

export type LetterHandle = {
    getLetter: () => string,
    setLetterStatus: (status: LetterStatus) => void
    getRect: () => DOMRect | null
}