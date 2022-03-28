import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCell } from '../../store/actions/moves';
import { resetBoard } from '../../store/actions/reset';
import { isWinner } from '../../utils/isWinner';
import { setWinner } from '../../store/actions/winner';

const selectBoard = (state) => state.board
const selectGame = (state) => state.game

export const useBoardHook = () => {
    const board = useSelector(selectBoard)
    const game = useSelector(selectGame)
    const dispatch = useDispatch()

    useEffect(() => {
        if(isWinner(board)) {
        dispatch(setWinner(game.currentPlayer === 'X'? 'O':'X'))
        }
    }, [board, dispatch, game.currentPlayer]);

    const onCellSelect = (value, rowIndex, columnIndex) => {
        if(!value && !game.winner) dispatch(selectCell(
        game.currentPlayer,
        rowIndex,
        columnIndex
        ))
    }

    const onResetBoard = () => {
        dispatch(resetBoard())
    }

    return {
        game,
        board,
        onCellSelect,
        onResetBoard
    }
}