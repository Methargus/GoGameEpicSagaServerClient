import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { GameService } from '../../../game.service';

@Component({
  selector: 'app-go-cell-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './go-cell-field.component.html',
  styleUrl: './go-cell-field.component.scss'
})
export class GoCellFieldComponent {
  @Input() fieldWidth!: number;
  @Input() fieldHeight!: number;
  @Input() x!: number;
  @Input() y!: number;
  @Input() playerColor!: string;

  wasClicked = false;

  constructor(private gameService: GameService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.playerColor = localStorage.getItem('playerColor')!;
    this.gameService.getGameBoard().subscribe(model => {
      this.wasClicked = model.board[this.x][this.y] != 0
      if(model.board[this.x][this.y] == -1) this.playerColor = "black"
      if(model.board[this.x][this.y] == 1) this.playerColor = "white"
      this.cdr.detectChanges();
    })
  }

  placeStone() {  
    this.gameService.placeStone(this.x, this.y)
  }
}
