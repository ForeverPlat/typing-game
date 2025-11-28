import { useSearchParams } from "react-router-dom"
import Result from "../components/Result";
import { useEffect } from "react";

const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const resultString = searchParams.get("result");

  let result;
  resultString ? result = JSON.parse(resultString) : result = "";

  useEffect(() => {
    
  }, [])

  return (
    <div>
      <Result result={result} />
    </div>
  )
}

export default ResultsPage