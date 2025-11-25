import { useSearchParams } from "react-router-dom"
import Result from "../components/Result";

const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const resultString = searchParams.get("result");

  let result;
  resultString ? result = JSON.parse(resultString) : result = "";

  return (
    <div>
      <Result result={result} />
    </div>
  )
}

export default ResultsPage