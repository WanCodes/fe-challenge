import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Board } from '.';
import configureStore from '../../store';
import { Provider } from 'react-redux';

describe('selectCell', () => {
  test('renders Board text', () => {
    render(<Provider store={configureStore()}><Board /></Provider>);
    const boardText = screen.getByText(/Player/i);
    expect(boardText).toBeInTheDocument();
  });

  // @TODO test can be optimised to test list predefined games
  test('play 1 round', () => {
    render(<Provider store={configureStore()}><Board /></Provider>);
    const boardcells = screen.getAllByLabelText("board-cell");

    // expect all cells to be null
    boardcells.forEach((cell) => {
      expect(cell.textContent).toBe("");
    });

    // current player X
    expect(screen.getByText(/Player X/i)).toBeInTheDocument();

    // player X click on the first cell
    fireEvent.click(boardcells.at(0));

    // current player O, cell = ['X', null, null, null, null, null, null, null, null]
    expect(screen.getByText(/Player O/i)).toBeInTheDocument();
    expect(boardcells.at(0).textContent).toBe("X");

    // player O click on the last cell
    fireEvent.click(boardcells.at(8))

    // current player X, cell = ['X', null, null, null, null, null, null, null, 'O']
    expect(screen.getByText(/Player X/i)).toBeInTheDocument();
    expect(boardcells.at(8).textContent).toBe("O");

    // player X click on the second cell
    fireEvent.click(boardcells.at(1))

    // current player O, cell = ['X', 'X', null, null, null, null, null, null, 'O']
    expect(screen.getByText(/Player O/i)).toBeInTheDocument();
    expect(boardcells.at(1).textContent).toBe("X");

    // player O click on the fifth cell
    fireEvent.click(boardcells.at(4))

    // current player X, cell = ['X', 'X', null, null, 'O', null, null, null, 'O']
    expect(screen.getByText(/Player X/i)).toBeInTheDocument();
    expect(boardcells.at(4).textContent).toBe("O");

    // player X click on the third cell
    fireEvent.click(boardcells.at(2))

    // current winner player X, cell = ['X', 'X', 'X', null, 'O', null, null, null, 'O']
    expect(screen.getByText(/Winner Player X/i)).toBeInTheDocument();
    expect(boardcells.at(2).textContent).toBe("X");
  });

  test('restart button should clear board', () => {
    render(<Provider store={configureStore()}><Board /></Provider>);
    const boardcells = screen.getAllByLabelText("board-cell");

    // expect all cells to be null
    boardcells.forEach((cell) => {
      expect(cell.textContent).toBe("");
    });


    // player X click on the third cell
    fireEvent.click(boardcells.at(2));

    // player O click on the third cell, and nothing should happen
    fireEvent.click(boardcells.at(2));

    // cell = [null, null, 'X', null, null, null, null, null, null] remains X
    boardcells.forEach((cell, index) => {
      if(index === 2) {
        expect(cell.textContent).toBe("X");
      } else {
        expect(cell.textContent).toBe("");
      } 
    });

    // click reset button
    fireEvent.click(screen.getByLabelText(/restart-game-button/i))
    
    // expect all cells to be null
    boardcells.forEach((cell) => {
      expect(cell.textContent).toBe("");
    });

  });
});