export type LetterStatus = "pending" | "correct" | "incorrect" 

export type Language = "javascript" | "python" | "java"

export type Result = {
    accuracy: number
    wpm: number
    charCount: number
    duration: number
}


export type LineProps = {
    words: string[];
    indent: number;
    resetToken: number;
};

export type LineHandle = {
    getWord: (wordIndex: number) => WordHandle | null
    getWordCount: () => number
    setPending: () => void
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
    setPending: () => void
    getEndRect: () => { left: number; top: number } | null
}

export type LetterHandle = {
    getLetter: () => string
    getStatus: () => LetterStatus
    setStatus: (status: LetterStatus) => void
    getRect: () => DOMRect | null
}


export type LoginRespone = {
    success: boolean
    message: string
    data: {
        token: string
        verified: boolean
        user: any
    };
    error?: string
}

export type LeaderboardObject = {
    wpm: number
    accuracy: number
    user: {
        _id: string
        username: string
    }
    createdAt: string
}

export type LeaderboardResponse = {
    success: boolean
    message: string
    data: {
        topResults: Array<LeaderboardObject>
    }
}

export type Profile = {
    username: string
    highestWpm: number
    averageWpm: number
    averageWpmLastFive: number
    highestAccuracy: number
    averageAccuracy: number
    averageAccuracyLastFive: number
    timeTyping: string
}

export type ProfileHeaderProp = {
    username: string
    profile: Profile
}

export type TypingTestProp = {
    resetToken: number
    selectedLanguage: Language
}

// export type Result = {
//     _id: string

// }