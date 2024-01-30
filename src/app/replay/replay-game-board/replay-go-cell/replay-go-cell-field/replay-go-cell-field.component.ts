import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-replay-go-cell-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './replay-go-cell-field.component.html',
  styleUrl: './replay-go-cell-field.component.scss'
})
export class ReplayGoCellFieldComponent {
  @Input() fieldWidth!: number;
  @Input() fieldHeight!: number;
  @Input() playerColor!: string;
}
