import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { SafeHtmlPipePipe } from "../shared/safe-html-pipe.pipe";
import { Observable } from 'rxjs';
import { GoGameComponent } from "./go-game/go-game.component";

@Component({
    selector: 'app-game-menu',
    standalone: true,
    templateUrl: './game-menu.component.html',
    styleUrl: './game-menu.component.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, SafeHtmlPipePipe, GoGameComponent]
})
export class GameMenuComponent {
  isPlayerBlack = false;
  gameBoardSize: Observable<number> = null!;
  //todo: if player is black then do observcable, that if board size was chosen it moves to the next page

  generateGrid(size: number): string {
    let grid = "";
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        grid += `<div class="go-cell" id="square-${i}-${j}"></div>`;
      }
    }
    return grid;
  }

  chooseBoardSize(size: number) {
    //push to gameBoardSize size
    this.gameBoardSize = new Observable<number>(observer => {
      observer.next(size)
    })
  }
}
