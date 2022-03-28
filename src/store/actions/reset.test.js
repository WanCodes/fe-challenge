import * as Actions from './reset'

describe('selectCell', () => {
  it('should create an action to select a cell', () => {
    const expectedAction = {
      type: Actions.RESET_BOARD,
    }
    const result = Actions.resetBoard()
    expect(result).toEqual(expectedAction)
  })
})
