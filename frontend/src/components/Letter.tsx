import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import type { LetterHandle, LetterProps, LetterStatus } from "../types"

const Letter = forwardRef<LetterHandle, LetterProps>(({ letter }, ref) => {

    const [status, setStatus] = useState<LetterStatus>("pending");
    // useEffect(() => {}, [status]);

    useImperativeHandle(ref, () => ({
      getLetter: () => letter,
      setLetterStatus: (status: LetterStatus) => setStatus(status)
    }));

  return (
    <div
      className={letter}
      id="letter"
      style={{ color:
        status === "correct" ? "white" :
        status === "incorrect" ? "red" :
        status === "pending" ? "grey" :
        "yellow"
      }}
    >
      { letter }
    </div>
  )
})

export default Letter