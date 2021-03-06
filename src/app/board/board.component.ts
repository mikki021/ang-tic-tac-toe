import { UtilsService } from './../utils.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {


  squares: any[];
  xIsNext: boolean;
  winner: string;
  winningSquares: any[];
  flash: boolean;
  moves: any[];
  isReplaying: boolean;
  utils: UtilsService;

  constructor(utilsService: UtilsService) {
    this.utils = utilsService;
  }

  ngOnInit() {
    this.newGame();
    setInterval(() => { this.flash = !this.flash; }, 500);
  }

  newGame() {
    this.reset();
    this.moves = [];
    this.isReplaying = false;
  }

  reset() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
    this.winningSquares = [];
  }

  fieldClick(i: number) {
    if (!this.isReplaying) {
      this.makeMove(i);
    }
  }

  makeMove(index: number) {
    if (!this.winner && !this.squares[index]) {
      this.squares.splice(index, 1, this.player);
      this.winner = this.calculateWinner();
      if (!this.isReplaying) {
        this.moves.push(index);
      }
      if (!this.winner) {
        this.xIsNext = !this.xIsNext;
      }
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
        this.winningSquares = [a, b, c];

        return this.squares[a];
      }
    }

    return null;
  }

  isWinningSquare(index) {
    return this.flash && this.winningSquares.length && this.winningSquares.includes(index);
  }

  async replayGame() {
    const stepInterval = 700;

    if (this.gameFinished) {
      this.isReplaying = true;
      this.reset();
      const delayedMoves = {
        [Symbol.asyncIterator]: () => {
          let i = 0;
          return {
            next: async () => {
              if (i >= this.moves.length) {
                return { value: null, done: true };
              }
              await this.utils.delay(stepInterval);
              const move = this.moves[i];
              i++;

              return { value: move, done: false };
            }
          };
        }
      };

      for await (const move of delayedMoves) {
        this.makeMove(move);
      }

      this.isReplaying = false;
    }
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  get allMovesMade() {
    return this.squares.every(square => !!square);
  }

  get gameInProgress() {
    return this.moves.length && !this.gameFinished;
  }

  get gameFinished() {
    return this.winner || this.allMovesMade;
  }

  get gameStatus() {
    const CURRENT_PLAYER_TEXT = 'Current player: ';
    const PLAYER_SHORTCODE = ':player';
    const GAME_WINNER_TEXT = 'Player ' + PLAYER_SHORTCODE + ' won the game!';
    const GAME_DRAW_TEXT = 'Game is a draw!';

    return this.winner
      ? GAME_WINNER_TEXT.replace(PLAYER_SHORTCODE, this.player)
      : this.allMovesMade
        ? GAME_DRAW_TEXT
        : CURRENT_PLAYER_TEXT + this.player;
  }

}
