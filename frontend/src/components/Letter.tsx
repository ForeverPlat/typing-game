import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import type { LetterHandle, LetterProps, LetterStatus } from "../types"

const Letter = forwardRef<LetterHandle, LetterProps>(({ letter }, ref) => {

    const [status, setStatus] = useState<LetterStatus>("pending");
    // useEffect(() => {}, [status]);
    const el = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      getLetter: () => letter,
      setLetterStatus: (status: LetterStatus) => setStatus(status),
      getRect: () => el.current?.getBoundingClientRect() ?? null
    }));

  return (
    <div
      className={letter}
      id="letter"
      ref={el}
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