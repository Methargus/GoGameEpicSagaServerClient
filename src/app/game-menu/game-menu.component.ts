import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SafeHtmlPipePipe } from "../shared/safe-html-pipe.pipe";
import { Observable } from 'rxjs';
import { GoGameComponent } from "./go-game/go-game.component";
import { ipcRenderer } from 'electron/renderer';
import { ElectronService } from '../core/services';
import { Router } from '@angular/router';
import { GameService } from './game.service';

@Component({
    selector: 'app-game-menu',
    standalone: true,
    templateUrl: './game-menu.component.html',
    styleUrl: './game-menu.component.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, SafeHtmlPipePipe, GoGameComponent]
})
export class GameMenuComponent implements OnInit {
  gameBoardSize: number = null!;
  inQueue = false

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

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit() {
    this.gameService.isInQueue().subscribe(gameStartMessageModel => {
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
    this.gameService.sendJoinQueueRequest(this.gameBoardSize)
  }

  leaveQueue() {
    this.inQueue = false
    this.gameService.sendLeaveQueueRequest()
  }

  redirect() {
    this.router.navigate(['/game'])
  }
}
