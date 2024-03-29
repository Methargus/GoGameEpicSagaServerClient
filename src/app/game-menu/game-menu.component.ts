import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { SafeHtmlPipePipe } from "../shared/safe-html-pipe.pipe";
import { first } from 'rxjs';
import { GoGameComponent } from "./go-game/go-game.component";
import { Router } from '@angular/router';
import { GameService } from './game.service';

@Component({
    selector: 'app-game-menu',
    standalone: true,
    templateUrl: './game-menu.component.html',
    styleUrl: './game-menu.component.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, SafeHtmlPipePipe, GoGameComponent ]
})
export class GameMenuComponent implements OnInit {
  gameBoardSize: number = null!;
  inQueue = false
  pvp = true

  generateGrid(size: number): string {
    let gamGridCellsSize = size-1;
    let grid = "";
    for (let i = 0; i < gamGridCellsSize; i++) {
      for (let j = 0; j < gamGridCellsSize; j++) {
        grid += `<div class="go-cell" id="square-${i}-${j}"></div>`;
      }
    }
    return grid;
  }

  constructor(private gameService: GameService, private router: Router, private ngZone: NgZone) {}

  ngOnInit() {
    this.gameService.isInQueue().pipe(first()).subscribe(gameStartMessageModel => {
      localStorage.setItem('playerColor', gameStartMessageModel.playerColor)
      localStorage.setItem('boardSize', gameStartMessageModel.boardSize.toString())
      this.redirect()
    })
  }

  chooseBoardSize(size: number) {
    this.gameBoardSize = size;
  }

  joinQueue() {
    this.inQueue = true
    this.gameService.sendJoinQueueRequest(this.gameBoardSize, this.pvp)
  }

  leaveQueue() {
    this.inQueue = false
    this.gameService.sendLeaveQueueRequest()
  }

  redirect() {
    this.ngZone.run(() => {
      this.router.navigate(['/game']);
    });
  }
}
