import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { GameService } from '../../../game.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-go-cell-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './go-cell-field.component.html',
  styleUrl: './go-cell-field.component.scss'
})
export class GoCellFieldComponent implements OnDestroy {
  @Input() fieldWidth!: number;
  @Input() fieldHeight!: number;
  @Input() x!: number;
  @Input() y!: number;
  @Input() playerColor!: string;

  wasClicked = false;
  subscribe: Subscription;
  constructor(private gameService: GameService, private cdr: ChangeDetectorRef) { require('events').EventEmitter.defaultMaxListeners = 0; }

  ngOnInit() {
    this.playerColor = localStorage.getItem('playerColor')!;
    this.subscribe = this.gameService.getGameBoard().subscribe(model => {
      this.wasClicked = model.board[this.x][this.y] != 0
      if(model.board[this.x][this.y] == -1) this.playerColor = "black"
      if(model.board[this.x][this.y] == 1) this.playerColor = "white"
      this.cdr.detectChanges();
    })
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  placeStone() {  
    this.gameService.placeStone(this.x, this.y)
  }
}
