import * as Actions from './winner'

describe('setWinner', () => {
  it('should create an action to select a cell', () => {
    const expectedAction = {
      type: Actions.SET_WINNER,
      player: 'X',
    }
    const result = Actions.setWinner('X')
    expect(result).toEqual(expectedAction)
  })
})
