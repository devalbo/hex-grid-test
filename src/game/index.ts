import {
  createGame,
  createBoardClasses,
  Player,
  Board,
} from '@boardzilla/core';
import { NUM_HEX_ROWS, NUM_HEX_COLUMNS, NUM_SLICE_COLUMNS, isBoardSpace } from './board-coordinates.js';

export class HexGridTestPlayer extends Player<HexGridTestPlayer, HexGridTestBoard> {

};

class HexGridTestBoard extends Board<HexGridTestPlayer, HexGridTestBoard> {

}

const { Space, Piece } = createBoardClasses<HexGridTestPlayer, HexGridTestBoard>();


export class HexSpace extends Space {
  hexSpIndex: number
}

export class SliceColumn extends Space {

}


export default createGame(HexGridTestPlayer, HexGridTestBoard, game => {

  const { board, action } = game;
  const { playerActions, loop, eachPlayer } = game.flowCommands;

  board.registerClasses(HexSpace, SliceColumn);

  board.createGrid({ rows: NUM_HEX_ROWS, columns: NUM_HEX_COLUMNS, style: 'hex-inverse'}, 
    HexSpace, 'hex-space');
  board.createGrid({ rows: 1, columns: NUM_SLICE_COLUMNS, style: 'square'}, SliceColumn, 'slice-column');

  // I don't want all the hex spaces, just the ones in the middle, so destroy the edge ones
  // board.all(HexSpace)
  //   .filter(hs => !isBoardSpace(hs.row!, hs.column!))
  //   .forEach(hs => hs.destroy());



  game.defineActions({
    makeGuess: player => action({
      prompt: 'Guess a number',
    }).chooseNumber(
      "guess", {
        min: 1,
        max: 10,
      }
    ).do(
      ({ guess }) => {
        if (guess === 7) {
          game.message("You're right!", { player });
          game.finish(player);
        }
      }
    )
  });

  game.defineFlow(
    loop(
      eachPlayer({
        name: 'player',
        do: playerActions({
          actions: ['makeGuess'],
        }),
      })
    )
  );
});
