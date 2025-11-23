import Letter from "./Letter";

const Word = ({ word }: { word: string }) => {

  return (
    <div id="word">
        {
            word.split("").map((letter, i) => (
                <Letter key={i} letter={letter} />
            ))
        }
    </div>
  )
}

export default Word