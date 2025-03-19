import { getLetterIndex, getTime } from "./script.js";

const letterIndex = getLetterIndex();
const time = getTime();

const wpm =  Math.round((letterIndex/5)/ time);

document.getElementById("stat-test").innerHTML = wpm;


