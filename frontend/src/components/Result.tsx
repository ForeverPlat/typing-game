import type { Result } from "../types";
import '../styles/result.css'
import { useNavigate } from "react-router-dom";

const Results = ({ result }: { result: Result }) => {
  const navigate = useNavigate();

  const { accuracy, wpm, charCount, duration } = result;

  const handleNextClick = () => {
    navigate('/');
  }

  return (

    <div className="main-results">
      <div className='wpm-container'>
        <div className='main-num' id='wpm-num'>{wpm}</div>
        <div className='main-text' id='wpm-text'> WPM </div>
      </div>

    <div className='main-bottom'>
      <div className='secondary-stats-container'>
        <div className='secondary-container'>
          <div className='secondary-num' id='accuracy-num'>{accuracy}%</div>
          <div className='secondary-text'>Accuracy</div>
        </div>
        <div className='secondary-container'>
          <div className='secondary-num' id='characters-num'>{charCount}</div>
          <div className='secondary-text'>Characters</div>
        </div>
        <div className='secondary-container'>
          <div className='secondary-num' id='time-num'>{Math.round(duration/1000)}s</div>
          <div className='secondary-text'>Time</div>
        </div>
      </div>

      <svg className='next-button' id='next-button' onClick={handleNextClick} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
          <path d='M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z' fill='currentColor'></path>
        </g>
      </svg>
    </div>


    </div>

  )
}

export default Results