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

  constructor() { }

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
    this.isReplaying = false;
  }

  makeMove(index: number) {
    if (!this.winner && !this.squares[index]) {
      this.squares.splice(index, 1, this.player);
      this.winner = this.calculateWinner();
      this.moves.push(index);
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

  replayGame() {
    if (this.winner) {
      this.isReplaying = true;
      this.reset();
      this.moves.forEach((move, index) => {
        setTimeout(() => {
          this.makeMove(move);
        }, (index + 1) * 1000);
      });
      this.isReplaying = false;
    }
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  get allMovesMade() {
    return this.squares.every(square => !!square);
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
