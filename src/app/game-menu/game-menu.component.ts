import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { SafeHtmlPipePipe } from "../shared/safe-html-pipe.pipe";

@Component({
    selector: 'app-game-menu',
    standalone: true,
    templateUrl: './game-menu.component.html',
    styleUrl: './game-menu.component.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, SafeHtmlPipePipe]
})
export class GameMenuComponent {
  isPlayerBlack = false;

  generateGrid(size: number): string {
    let grid = "";
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        grid += `<div class="go-cell" id="square-${i}-${j}"></div>`;
      }
    }
    return grid;
  }
}
