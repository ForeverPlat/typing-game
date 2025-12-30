import { driver } from 'driver.js';

export const typingTour = driver({
    showProgress: true,
    nextBtnText: 'Next',
    prevBtnText: 'Back',
    steps: [
        {
            element: "#typing-test",
            popover: {
                title: "Type here",
                description: "Accuracy matters more than speed.",
                side: "top"
            },
        },
        {
            element: "#reset-button",
            popover: {
                title: "Reset Button",
                description: "Click this to generate a new test.",
                side: "top"
            },
        },
        {
            element: "#language-selector",
            popover: {
                title: "Langauge Selector",
                description: "Choose what langauge you want to test.",
                side: "bottom"
            },
        },
        {
            element: "#leaderboard-button",
            popover: {
                title: "Leaderboard Button",
                description: "Click this to see the leaderboard.",
                side: "bottom"
            },
        },
        {
            element: "#profile-button",
            popover: {
                title: "Profile Button",
                description: "Create an account to track your results.",
                side: "bottom"
            },
        },
    // more steps after
    ]
})