import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { ReplayGoCellFieldComponent } from "./replay-go-cell-field/replay-go-cell-field.component";

@Component({
    selector: 'app-replay-go-cell',
    standalone: true,
    templateUrl: './replay-go-cell.component.html',
    styleUrl: './replay-go-cell.component.scss',
    imports: [CommonModule, ReplayGoCellFieldComponent]
})
export class ReplayCellFieldComponent {
  @Input() x!: number;
  @Input() y!: number;

  @Input() boardXSize!: number;
  @Input() boardYSize!: number;

  @Input() board!: number[][];

  @ViewChild('goCell', { static: false }) goCell!: ElementRef;
  width = 0;
  height = 0;
  fieldWidth = 20;
  fieldHeight = 20;

  scale = 2/3;

  constructor(private cdr: ChangeDetectorRef) {}

  @HostListener('window:resize')
  onWindowResize() {
    this.updateComponentSize();
  }
  ngAfterViewInit() {
    this.updateComponentSize();
  }

  updateComponentSize() {
    this.fieldWidth = this.goCell.nativeElement.getBoundingClientRect().width * this.scale
    this.fieldHeight = this.goCell.nativeElement.getBoundingClientRect().height * this.scale

    this.width = this.goCell.nativeElement.getBoundingClientRect().width - (this.fieldWidth/2 + 2); //  + border
    this.height = this.goCell.nativeElement.getBoundingClientRect().height - (this.fieldHeight/2 + 2);

    this.cdr.detectChanges();
  }

  getPlayerColor(x:number , y:number) {
    return this.board[x][y] == -1 ? "black" : this.board[x][y] == 1 ? "white" : "none"
  }
}
