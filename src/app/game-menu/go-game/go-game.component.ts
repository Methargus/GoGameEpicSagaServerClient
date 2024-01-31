import { Component } from '@angular/core';
import { GoCellComponent } from "./go-cell/go-cell.component";
import { CommonModule } from '@angular/common';
import { GameService } from '../game.service';
import { first } from 'rxjs';
import { GoHomeButtonComponent } from "../../go-home-button/go-home-button.component";

@Component({
    selector: 'app-go-game',
    standalone: true,
    templateUrl: './go-game.component.html',
    styleUrl: './go-game.component.scss',
    imports: [CommonModule, GoCellComponent, GoHomeButtonComponent]
})
export class GoGameComponent {
  size!: number;
  playerColor!: string;
  grid!: string;
  coordinates: {x: number, y: number}[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.size = parseInt(localStorage.getItem('boardSize')!);
    this.playerColor = localStorage.getItem('playerColor')!;
    let gameGridCellsSize = this.size-1;
    for (let i = 0; i < gameGridCellsSize; i++) {
      for (let j = 0; j < gameGridCellsSize; j++) {
        this.coordinates.push({x: j, y: i});
      }
    }

    this.gameService.getGameEndStatistics().pipe(first()).subscribe(model => {
      model.winnerColor == this.playerColor ? alert("You won!") : alert("You lost!")
    })
  }

  pass() {
    this.gameService.pass();
  }

  giveUp() {
    this.gameService.giveUp();
  }
}
