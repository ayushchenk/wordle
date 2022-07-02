import { useEffect, useState } from "react";
import { useKeyboard } from "../hooks/useKeyboard";
import { Row } from "./Row";

const API_URL = "https://random-word-api.herokuapp.com/word?length=";

export interface BoardProps {
    length: number;
    attempts: number;
}

export function Board(props: BoardProps) {
    console.log("board renders");

    const [correctAnswer, setCorrectAnswer] = useState("");
    const [attempts, setAttemtps] = useState(Array<string>(props.attempts).fill(""));
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        fetch(API_URL + props.length, { method: "GET" })
            .then(response => response.json())
            .then(words => {
                console.log(words[0]);
                setCorrectAnswer(words[0].toLowerCase());
            })
            .catch(console.error);
    }, []);

    const submitHandler = (answer: string) => {
        if (!isGameOver) {
            const newAttemps = [...attempts];
            newAttemps[attempts.findIndex(a => a === "")] = answer;
            setAttemtps(newAttemps);

            if (answer === correctAnswer) {
                setIsGameOver(true);
            }

            if (attempts.filter(a => a !== "").length === props.attempts) {
                setIsGameOver(true);
            }
        }
    };

    const currentAnswer = useKeyboard(props.length, submitHandler);

    const rows = attempts.map((attempt, i) => {
        const word = i === attempts.findIndex(a => a === "") ? currentAnswer : attempt;
        return <Row
            key={i}
            length={props.length}
            currentAnswer={word}
            correctAnswer={correctAnswer}
            shouldHighlight={word === attempts[i] && word !== ""} />
    });

    return (
        <div className="board">
            {rows}
        </div>
    );
}