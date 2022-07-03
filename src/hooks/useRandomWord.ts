import { useEffect, useState } from "react";

const API_URL = "https://random-word-api.herokuapp.com/word?length=";

export function useRandomWord(length: number) {
    const [word, setWord] = useState("");

    useEffect(() => {
        fetch(API_URL + length, { method: "GET" })
            .then(response => response.json())
            .then(words => setWord(words[0].toLowerCase()))
            .catch(console.error);
    }, [length]);

    return word;
}