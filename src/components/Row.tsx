import { Tile, TileState } from "./Tile";

export interface RowProps {
    currentAnswer: string;
    correctAnswer: string;
    length: number;
    shouldHighlight: boolean;
}

export function Row(props: RowProps) {
    const tiles: JSX.Element[] = [];

    for (let i = 0; i < props.length; i++) {
        const char = props.currentAnswer[i] ?? '';
        let state: TileState = "";

        if (props.shouldHighlight) {
            if (char === props.correctAnswer[i]) {
                state = "correct";
            }
            else if (props.correctAnswer.includes(char)) {
                state = "close";
            }
            else {
                state = "wrong";
            }
        }

        tiles.push(<Tile key={i} char={char} state={state}></Tile>);
    }

    return (
        <div className="row">{tiles}</div>
    );
}