import { useState } from "react"
import Word from "./Word"

const TypingTest = () => {

    const [text, setText] = useState("Hello World");
    const words = text.split(" ");

  return (
    <>
        {words.map((word, i) => (
            <Word key={i} word={word} />
        ))}
    </>
  )
}

export default TypingTest