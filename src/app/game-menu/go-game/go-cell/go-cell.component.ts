import { Component, Input } from '@angular/core';
import { GoCellFieldComponent } from "./go-cell-field/go-cell-field.component";

@Component({
    selector: 'app-go-cell',
    standalone: true,
    templateUrl: './go-cell.component.html',
    styleUrl: './go-cell.component.scss',
    imports: [GoCellFieldComponent]
})
export class GoCellComponent {
  @Input() x!: number;
  @Input() y!: number;

  @Input() boardXSize!: number;
  @Input() boardYSize!: number;
}
