import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TypingTestPage from './pages/TypingTestPage'

function App() {

  const router = createBrowserRouter([
    { path: "/", element: <TypingTestPage /> }
  ]) 

  return (
    <>
    </>
  )
}

export default App
