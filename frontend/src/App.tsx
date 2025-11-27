import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TypingTestPage from './pages/TypingTestPage'
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import Layout from "./components/Layout";
import ResultPage from "./pages/ResultPage";



function App() {
  
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <TypingTestPage /> },
        { path: "/leaderboard", element: <LeaderboardPage /> },
        { path: "/profile", element: <ProfilePage /> },
        { path: "/result", element: <ResultPage /> },
      ]
    },
    { path: "/auth", element: <AuthPage /> }
  ]);

  return (
    <RouterProvider router={router} />
  )
  
}

export default App
