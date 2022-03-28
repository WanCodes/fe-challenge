import React from 'react';
import styles from './index.module.css';

import { useBoardHook } from './useBoardHook';

export const Board = () => {
  const {game, board, onCellSelect, onResetBoard} = useBoardHook();

  return (
    <div className={styles.Board}>
      <div className={styles.Player}>
        {game.winner? `Winner Player ${game.winner}` : `Player ${game.currentPlayer}`}
      </div>
      <div className={styles.GameBoard}>
        {board.map((rows, rowIndex) => {
          return rows.map((value, columnIndex) => (
            <div
              aria-label="board-cell"
              key={columnIndex}
              className={styles.BoardCell}
              onClick={() => onCellSelect(value, rowIndex, columnIndex)}
            >
              {value}
            </div>
          ))
        })}
      </div>
      <div
        aria-label="restart-game-button"
        className={styles.RestartGame}
        onClick={onResetBoard}
      >
        Restart Game
      </div>
    </div>
  )
}
