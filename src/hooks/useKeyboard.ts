import { useEffect, useState } from "react";

export function useKeyboard(maxLength: number, callback: (answer: string) => void): string {
    const [currentAnswer, setCurrentAnswer] = useState("");

    useEffect(() => {
        const keyHandler = (event: KeyboardEvent) => {
            if (event.key === "Enter" && currentAnswer.length === maxLength) {
                callback(currentAnswer);
                setCurrentAnswer("");
                return;
            }

            if (event.key === "Backspace") {
                setCurrentAnswer(currentAnswer.slice(0, -1));
                return;
            }

            if (/^[a-z]$/.test(event.key.toLowerCase()) && currentAnswer.length !== maxLength) {
                setCurrentAnswer(oldAnswer => oldAnswer + event.key.toLowerCase());
            }
        };

        document.addEventListener("keydown", keyHandler);

        return () => document.removeEventListener("keydown", keyHandler);
    }, [currentAnswer, maxLength, callback]);

    return currentAnswer;
}   