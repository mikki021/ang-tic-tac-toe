import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button nbButton *ngIf="!value" [disabled]="disabled">{{ value }}</button>
    <button nbButton hero status="warning" *ngIf="nonWinningX" [disabled]="disabled">{{ value }}</button>
    <button nbButton hero status="info" *ngIf="nonWinningO" [disabled]="disabled">{{ value }}</button>
    <button nbButton hero status="success" *ngIf="winningSquare" [disabled]="disabled">{{ value }}</button>
  `,
  styles: ['button { width: 100%; height: 100%; font-size: 5em !important; }']
})
export class SquareComponent {
  @Input() value: 'X' | 'O';
  @Input() winningSquare: boolean;
  @Input() disabled: boolean;

  get nonWinningX() {
    return !this.winningSquare && this.value === 'X';
  }

  get nonWinningO() {
    return !this.winningSquare && this.value === 'O';
  }
}
