import { Component, Input, ViewEncapsulation } from '@angular/core';
import { GoCellComponent } from "./go-cell/go-cell.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-go-game',
    standalone: true,
    templateUrl: './go-game.component.html',
    styleUrl: './go-game.component.scss',
    imports: [CommonModule, GoCellComponent]
})
export class GoGameComponent {
  size!: number;
  playerColor!: string;
  grid!: string;
  coordinates: {x: number, y: number}[] = [];

  ngOnInit() {
    this.size = parseInt(localStorage.getItem('boardSize')!);
    this.playerColor = localStorage.getItem('playerColor')!;
    let gameGridCellsSize = this.size-1;
    for (let i = 0; i < gameGridCellsSize; i++) {
      for (let j = 0; j < gameGridCellsSize; j++) {
        this.coordinates.push({x: j, y: i});
      }
    }
  }
}
