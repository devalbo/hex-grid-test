import {
  createGame,
  createBoardClasses,
  Player,
  Board,
} from '@boardzilla/core';

export class HexGridTestPlayer extends Player<HexGridTestPlayer, HexGridTestBoard> {
};

class HexGridTestBoard extends Board<HexGridTestPlayer, HexGridTestBoard> {
}

const { Space, Piece } = createBoardClasses<HexGridTestPlayer, HexGridTestBoard>();

export default createGame(HexGridTestPlayer, HexGridTestBoard, game => {

  const { board, action } = game;
  const { playerActions, loop, eachPlayer } = game.flowCommands;

  board.registerClasses();

  game.defineActions({
  });

  game.defineFlow(
  );
});
