import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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

  ngOnInit() {
    this.playerColor = localStorage.getItem('playerColor')!;
  }
  
  placeStone() {
    console.log("Placed stone at: " + this.x + ", " + this.y)
    this.wasClicked = true;
  }
}
