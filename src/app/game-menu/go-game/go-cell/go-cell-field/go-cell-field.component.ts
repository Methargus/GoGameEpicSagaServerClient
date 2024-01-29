import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-go-cell-field',
  standalone: true,
  imports: [],
  templateUrl: './go-cell-field.component.html',
  styleUrl: './go-cell-field.component.scss'
})
export class GoCellFieldComponent {
  @Input() fieldWidth!: number;
  @Input() fieldHeight!: number;
  @Input() x!: number;
  @Input() y!: number;

  placeStone() {
    console.log("Placed stone at: " + this.x + ", " + this.y)
  }
}
