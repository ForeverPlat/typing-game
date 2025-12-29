import { useEffect } from "react"
import { typingTour } from "./typingTour";

export const useTypingTour = () => {
    useEffect(() => {
        const seen = localStorage.getItem("typing-tour-seen");

        if (!seen) {
            // small delay to ensure dom is ready
            setTimeout(() => {
                typingTour.drive();
                localStorage.setItem("typing-tour-seen", "true");
            }, 100);
        }
    }, [])
}