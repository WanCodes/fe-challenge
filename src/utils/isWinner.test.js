import { isWinner } from './isWinner'

describe('isWinner', () => {
  it('should return true if winner', () => {
    const mockBoard = [
        [null, 'X', null],
        ['O', 'X', null],
        ['O', 'X', null]
    ]
    expect(isWinner(mockBoard)).toEqual(true)
  });
  it('should return false if no winner', () => {
    const mockBoard = [
        [null, 'X', null],
        ['O', 'X', 'X'],
        ['O', 'O', null]
    ]
    expect(isWinner(mockBoard)).toEqual(false)
  });
  it('should return true if winner with complete board', () => {
    const mockBoard = [
        ['X', 'X', 'O'],
        ['O', 'X', 'O'],
        ['X', 'O', 'X']
    ]
    expect(isWinner(mockBoard)).toEqual(true)
  });
  it('should return false if no winner with complete board', () => {
    const mockBoard = [
        ['O', 'X', 'O'],
        ['O', 'X', 'X'],
        ['X', 'O', 'X']
    ]
    expect(isWinner(mockBoard)).toEqual(false)
  });
});
