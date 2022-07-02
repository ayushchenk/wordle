export type TileState = "correct" | "close" | "wrong" | "";

export interface TileProps {
    state: TileState;
    char: string;
}

export function Tile(props: TileProps) {
    return (
        <div className={`tile ${props.state}`}>{props.char}</div>
    );
}