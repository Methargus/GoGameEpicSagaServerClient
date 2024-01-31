import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { GoCellComponent } from "./go-cell/go-cell.component";
import { CommonModule } from '@angular/common';
import { GameService } from '../game.service';
import { first } from 'rxjs';
import { GoHomeButtonComponent } from "../../go-home-button/go-home-button.component";
import { MatDialog } from '@angular/material/dialog';
import { EndGameDialogComponent } from '../end-game-dialog/end-game-dialog.component';

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

  constructor(private gameService: GameService, public dialog: MatDialog, private ngZone: NgZone) {}

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
      console.log(model)
      this.ngZone.run(() => {
        const dialogRef = this.dialog.open(EndGameDialogComponent, {
          data: { hasPlayerWon: model.winnerColor == this.playerColor, blackScore: model.blackScore, whiteScore: model.whiteScore, gameHash: model.gameHash },
          width: '700px',
          height: '350px'
        });
      })
    })
  }

  pass() {
    this.gameService.pass();
  }

  giveUp() {
    this.gameService.giveUp();
  }
}
