# Tic-Tac-Toe

Two-player tic-tac-toe by [Wan Yau](https://github.com/WanCodes). X and O take turns on a 3×3 board. The first player with three marks in a row, column, or diagonal wins. **Restart Game** clears the board and gives the turn back to X.

This repository is the completed solution for the Syft front-end coding challenge. The npm package name is `syft-coding-challenge`.

<img width="463" height="594" alt="Opening screen: Player X to move, an empty teal board, and a Restart Game button" src="https://github.com/user-attachments/assets/dd985332-5407-4847-9aec-f9eb7fd199dd" />

## Gameplay

The line above the board shows whose turn it is: `Player X` or `Player O`. After a win it shows `Winner Player X` or `Winner Player O`.

- X moves first.
- Choose an empty cell to place the current player's mark. The turn switches as soon as the mark is stored.
- Choosing a filled cell leaves that mark in place.
- Once a winner is set, the board ignores further clicks.
- A full board with no three-in-a-row stays on screen. The status line still names the player who would move next, and **Restart Game** starts a new game.
- **Restart Game** empties every cell, clears the winner, and sets the current player to X.

The grid is a fixed 400×400 CSS grid. Marks are `X` and `O`. Empty cells render blank.

## Stack

| Layer | Choice |
| --- | --- |
| UI | React 16.13.1, mounted with `ReactDOM.render` |
| Styling | CSS Modules in `src/components/board/index.module.css` |
| State | Redux 4.0.5 and React Redux 7.2.1 |
| Middleware | Redux Thunk 2.3.0, Redux Saga 1.1.3, and Redux Observable 1.2.0 are registered on the store |
| DevTools | `redux-devtools-extension` 2.13.8, in development only |
| Tooling | Create React App 3 (`react-scripts` 3.4.1) |
| Tests | Jest, `@testing-library/react` 9.3.2, and `@testing-library/jest-dom` 4.2.4 |

The source is JavaScript. The win check lives in the board hook. The root saga yields an empty `all([])`, and the root epic is `combineEpics()` with no epics. In development the store is composed with Redux DevTools, so an installed browser extension can follow `SELECT_CELL`, `SET_WINNER`, and `RESET_BOARD`.

## Layout

```
src/
  index.jsx                      Redux Provider and <Board />
  components/board/
    index.jsx                    status line, grid, and restart control
    useBoardHook.js              selectors, moves, and the win effect
    index.module.css             board layout and colors
    index.test.js                rendered game behavior
  store/
    index.js                     store and middleware setup
    actions/moves.js             selectCell → SELECT_CELL
    actions/winner.js            setWinner → SET_WINNER
    actions/reset.js             resetBoard → RESET_BOARD
    reducers/index.js            board and game reducers
    sagas/index.js               empty root saga
    epics/index.js               empty root epic
  utils/isWinner.js              three-in-a-row check
public/                          Create React App page shell
```

`src/index.jsx` is the entry file. The page shell in `public/index.html` mounts the app on `#root`.

## State

```js
{
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  game: {
    currentPlayer: "X", // "X" or "O"
    winner: null,       // null, "X", or "O"
  },
}
```

`createBoard(3)` builds the empty grid. Each cell is `null`, `"X"`, or `"O"`.

| Action | Effect |
| --- | --- |
| `selectCell(currentPlayer, row, col)` | Writes `currentPlayer` to `board[row][col]` and toggles `game.currentPlayer` between `X` and `O`. |
| `setWinner(player)` | Sets `game.winner`. |
| `resetBoard()` | Replaces the board with a new empty 3×3 grid and resets the game to `{ currentPlayer: "X", winner: null }`. |

The board reducer clones the grid with `JSON.parse(JSON.stringify(state))` before it writes a cell. `useBoardHook` dispatches `selectCell` only when the clicked cell is empty and `game.winner` is still `null`.

## Win check

`src/utils/isWinner.js` flattens the board in row-major order and returns a boolean. A line counts when all three cells hold the same mark:

| Line | Indexes |
| --- | --- |
| Rows | `[0, 1, 2]`, `[3, 4, 5]`, `[6, 7, 8]` |
| Columns | `[0, 3, 6]`, `[1, 4, 7]`, `[2, 5, 8]` |
| Diagonals | `[0, 4, 8]`, `[2, 4, 6]` |

Lines that still contain `null` are left out.

`useBoardHook` runs that check in an effect when `board` or `game.currentPlayer` changes. `SELECT_CELL` switches the turn in the reducer before the effect runs, so the effect records the other player as the winner. When X completes a line, the reducer sets `currentPlayer` to `O` and the effect dispatches `setWinner("X")`. The opening board fails the check. `setWinner` leaves `currentPlayer` unchanged, so the same move does not dispatch a winner twice.

## Requirements

- Node.js 17 or later. Node.js 22 is a known-good version: the app, the test suite, and a production build were run there. `npm start` forwards `--openssl-legacy-provider` to Node so webpack 4, used by Create React App 3, can hash files under OpenSSL 3.
- npm, to install from the committed `package-lock.json`.

## Run locally

```bash
npm ci
npm start
```

Open [http://localhost:3000](http://localhost:3000). Saving a file reloads the page. The Create React App ESLint setup prints lint findings in the terminal that started the dev server.

## Test

Watch mode, which reruns on save:

```bash
npm test
```

A single run that exits:

```bash
CI=true npm test
```

That run is 6 suites and 15 tests:

- `src/utils/isWinner.test.js` covers a column win, a diagonal win on a full board, and two boards with no completed line.
- `src/store/actions/moves.test.js`, `winner.test.js`, and `reset.test.js` check the shape of `selectCell`, `setWinner`, and `resetBoard`.
- `src/store/reducers/index.test.js` checks `createBoard` for sizes 0 through 9, the default 3×3 board, a cell update, the default game state, and the turn toggle from X to O and back.
- `src/components/board/index.test.js` checks the status line, a game in which X wins the top row, a restart that clears every cell, and a second click on a filled cell.

In that winning game, X plays indexes 0, 1, and 2. O plays indexes 8 and 4. Indexes follow DOM order, which is row-major. The component tests find every cell by the accessible name `board-cell` and the restart control by `restart-game-button`.

`npm test` does not need the OpenSSL legacy provider.

## Production build

```bash
NODE_OPTIONS=--openssl-legacy-provider npm run build
```

The static bundle is written to `build/`. Host it at the site root. `package.json` has no `homepage` field, so the asset paths are absolute from `/`.

On Node.js 17 and later, `npm run build` with no extra environment variable stops in webpack with `ERR_OSSL_EVP_UNSUPPORTED` (`error:0308010C:digital envelope routines::unsupported`). The `start` script already passes `--openssl-legacy-provider`. The `build` script needs the same flag via `NODE_OPTIONS`, which is what the command above sets.

## Challenge scope

The brief asked for a board rendered from `state.board` and `state.game.currentPlayer`, a `selectCell` dispatch for each chosen cell, and a winner stored on `state.game.winner` when a player takes three uninterrupted cells in a row, column, or diagonal. The scaffold registered Redux Thunk, Redux Saga, and Redux Observable for side effects, and left the interface open to plain CSS or a component library. This solution styles the board with CSS Modules and runs the win check in `useBoardHook`.
