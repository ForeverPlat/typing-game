import { driver } from 'driver.js';

export const typingTour = driver({
    showProgress: true,
    nextBtnText: 'Next',
    prevBtnText: 'Back',
    doneBtnText: 'Start Typing!',
    steps: [
        {
            element: "#typing-test",
            popover: {
                title: "Welcome to the Typing Test",
                description: "Start typing to begin. Focus on accuracy first, speed will follow naturally.",
                side: "top"
            },
        },
        {
            element: "#language-select",
            popover: {
                title: "Choose Your Language",
                description: "Practice with real code snippets in JavaScript, Python, or Java.",
                side: "bottom"
            },
        },
        {
            element: "#reset-button",
            popover: {
                title: "Need a Fresh Start?",
                description: "Generate a new code snippet anytime to keep practicing.",
                side: "top"
            },
        },
        {
            element: "#leaderboard-button",
            popover: {
                title: "Compete with Others",
                description: "Check the leaderboard to see how you stack up against other typists.",
                side: "bottom"
            },
        },
        {
            element: "#profile-button",
            popover: {
                title: "Track Your Progress",
                description: "Create an account to save your results and watch your skills improve over time.",
                side: "bottom"
            },
        },
    ]
})