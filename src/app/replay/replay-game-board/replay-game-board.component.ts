import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy } from '@angular/core';
import { ReplayService } from '../replay-service.service';
import { ReplayCellFieldComponent } from "./replay-go-cell/replay-go-cell.component";
import { CommonModule } from '@angular/common';
import { first } from 'rxjs';

@Component({
    selector: 'app-replay-game-board',
    standalone: true,
    templateUrl: './replay-game-board.component.html',
    styleUrl: './replay-game-board.component.scss',
    imports: [ReplayCellFieldComponent, CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class ReplayGameBoardComponent implements OnDestroy {
  @Input() requestBoardOfGivenTurn!: EventEmitter<number>;
  @Input() gameHash!: string;

  board!: number[][];
  coordinates: {x: number, y: number}[] = []
  size!: number

  done = false
  detected = false
  constructor(private replayService: ReplayService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.requestBoardOfGivenTurn.subscribe(turn => {
      this.replayService.getGameBoardOfGivenTurn(this.gameHash, turn).pipe(first()).subscribe(boardModel => {
        this.board = boardModel.board;

        if(!this.done) {
          this.size = boardModel.board.length;
          this.cdr.detectChanges();

          for (let i = 0; i < this.size-1; i++) {
            for (let j = 0; j < this.size-1; j++) {
              this.coordinates[i*(this.size-1) + j] = {x: j, y: i};
            }
          }
          this.done = true;
        }
        this.cdr.detectChanges();
      })
    })
  }

  ngOnDestroy() {
    this.requestBoardOfGivenTurn.unsubscribe();
  }
}
