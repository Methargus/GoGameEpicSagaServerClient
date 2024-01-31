import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-end-game-dialog',
  standalone: true,
  imports: [],
  templateUrl: './end-game-dialog.component.html',
  styleUrl: './end-game-dialog.component.scss'
})
export class EndGameDialogComponent {
  hasPlayerWon: boolean
  blackScore: number
  whiteScore: number

  constructor(@Inject(MAT_DIALOG_DATA) public data: { hasPlayerWon: boolean; blackScore: number; whiteScore: number; }, public dialogRef: MatDialogRef<EndGameDialogComponent>) {
    this.hasPlayerWon = data.hasPlayerWon
    this.blackScore = data.blackScore
    this.whiteScore = data.whiteScore
  }
}