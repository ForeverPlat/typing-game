import { useState } from "react"

type Status = "pending" | "correct" | "incorrect"

const Letter = ({ letter }: { letter: string }) => {

    const [status, setStatus] = useState<Status>("pending");
  
  return (
    <div className={status} id="letter">{ letter }</div>
  )
}

export default Letter