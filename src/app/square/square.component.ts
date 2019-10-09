import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button nbButton *ngIf="!value">{{ value }}</button>
    <button nbButton hero status="warning" *ngIf="nonWinningX">{{ value }}</button>
    <button nbButton hero status="info" *ngIf="nonWinningO">{{ value }}</button>
    <button nbButton hero status="success" *ngIf="winningSquare">{{ value }}</button>
  `,
  styles: ['button { width: 100%; height: 100%; font-size: 5em !important; }']
})
export class SquareComponent {
  @Input() value: 'X' | 'O';
  @Input() winningSquare: boolean;

  get nonWinningX() {
    return !this.winningSquare && this.value === 'X';
  }

  get nonWinningO() {
    return !this.winningSquare && this.value === 'O';
  }
}
