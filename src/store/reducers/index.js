import { combineReducers } from "redux";
import { SELECT_CELL } from "../actions/moves";
import { RESET_BOARD } from "../actions/reset";
import { SET_WINNER } from "../actions/winner";

export const createBoard = (i) =>
  Array(i)
    .fill(null)
    .map(_ =>
      Array(i)
        .fill(null)
    )

export const board = (state = createBoard(3), action) => {
  switch (action.type) {
    case SELECT_CELL: {
      const newBoard = JSON.parse(JSON.stringify(state));
      newBoard[action.row][action.col] = action.currentPlayer;
      return newBoard
    }
    case RESET_BOARD: {
      return createBoard(3);
    }
    default: {
      return state
    }
  }
}

export const game = (state = { currentPlayer: 'X', winner: null }, action) => {
  switch (action.type) {
    case SELECT_CELL: {
      return {
        ...state,
        currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X'
      }
    }
    case SET_WINNER: {
      return {
        ...state,
        winner: action.player,
      }
    }
    case RESET_BOARD: {
      return {
        currentPlayer: 'X', winner: null
      }
    }
    default: {
      return state
    }
  }
}

export default combineReducers({
  board,
  game
})
