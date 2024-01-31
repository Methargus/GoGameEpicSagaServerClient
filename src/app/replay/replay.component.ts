import { Component, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReplayGameBoardComponent } from "./replay-game-board/replay-game-board.component";
import { GoHomeButtonComponent } from "../go-home-button/go-home-button.component";

@Component({
    selector: 'app-replay',
    standalone: true,
    templateUrl: './replay.component.html',
    styleUrl: './replay.component.scss',
    imports: [FormsModule, ReplayGameBoardComponent, GoHomeButtonComponent]
})
export class ReplayComponent {
  parentEvent = new EventEmitter<number>();
  turn = 0; 
  replayLaunched = false
  inputValue!: string;


  launchReplay() {
      this.parentEvent.emit(0);
      this.replayLaunched = true
  }

  previousTurn() {
    this.parentEvent.emit(--this.turn);
  }

  nextTurn() {
    this.parentEvent.emit(++this.turn);
  }
}
