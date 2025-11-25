import type { ReactElement } from "react"

export type LetterStatus = "pending" | "correct" | "incorrect" 

export type Result = {
    accuracy: number
    wpm: number
    charCount: number
    duration: number
}

export type LetterProps = {
    letter: string
    status: LetterStatus
}

export type WordStatus = "pending" | "correct" | "incorrect" | "incomplete"

export type WordProps = {
    word: string
    status: WordStatus
}

export type WordHandle = {
    getWord: () => string
    getLetter: (index: number) => LetterHandle | null
    getLetterCount: () => number 
    setStatus: (status: WordStatus) => void
    getEndRect: () => { left: number; top: number } | null
}

export type LetterHandle = {
    getLetter: () => string
    getStatus: () => LetterStatus
    setStatus: (status: LetterStatus) => void
    getRect: () => DOMRect | null
}