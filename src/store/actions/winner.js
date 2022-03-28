export const SET_WINNER = 'SET_WINNER'

export function setWinner(player) {
  return {
    type: SET_WINNER,
    player,
  }
}
