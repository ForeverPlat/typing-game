import { driver } from 'driver.js';

export const typingTour = driver({
    showProgress: true,
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
            element: "#language-selector",
            popover: {
                title: "Langauge Selector",
                description: "Choose what langauge you want to test.",
                side: "bottom"
            },
        }
    // more steps after
    ]
})