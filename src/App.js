import { useState } from "react";
import "./App.css";

// Square component
function Square({ value, onSquareClick }) {
  return (
    <button
      className={`square ${value ? `square-${value.toLowerCase()}` : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

// Board component
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status = winner
    ? "Winner: " + winner
    : squares.every((square) => square)
    ? "Draw!"
    : "Next player: " + (xIsNext ? "X" : "O");

  return (
    <div className="board-container">
      <div className="status">{status}</div>
      <div className="board">
        {[0, 3, 6].map((row) => (
          <div key={row} className="board-row">
            {[0, 1, 2].map((col) => (
              <Square
                key={row + col}
                value={squares[row + col]}
                onSquareClick={() => handleClick(row + col)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Game component
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [showMoves, setShowMoves] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    setHistory([...history.slice(0, currentMove + 1), nextSquares]);
    setCurrentMove((prev) => prev + 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  function toggleMoveHistory() {
    setShowMoves(!showMoves);
  }

  const moveButtons = history.map((_, move) => (
    <button
      key={move}
      className={`move-button ${currentMove === move ? "active-move" : ""}`}
      onClick={() => jumpTo(move)}
    >
      {move === 0 ? "Start" : `#${move}`}
    </button>
  ));

  return (
    <div className="page-container">
      <div className="game-container">
        <h1 className="title">Tic-Tac-Toe</h1>
        <div className="game">
          <div className="game-board">
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
            />
          </div>
          <div className="game-controls">
            <div className="control-panel">
              <button
                className="control-button restart-button"
                onClick={resetGame}
              >
                Restart Game
              </button>
              <button
                className="control-button history-button"
                onClick={toggleMoveHistory}
              >
                {showMoves ? "Hide Moves" : "Show Moves"}
              </button>
              <button
                className="control-button start-button"
                onClick={() => jumpTo(0)}
              >
                Go to Start
              </button>
            </div>
            <div className="move-history-container">
              <div
                className={`move-history ${
                  !showMoves ? "move-history-hidden" : ""
                }`}
              >
                <div className="move-history-title">Move History</div>
                <div className="move-buttons-container">{moveButtons}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        © 2025 | Made with ❤️ by{" "}
        <a href="https://github.com/dopenoalyssa" className="footer-link">
          Alyssa D.
        </a>
      </footer>
    </div>
  );
}

// Helper function to determine the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
