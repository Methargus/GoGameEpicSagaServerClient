import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-queue-handler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './queue-handler.component.html',
  styleUrl: './queue-handler.component.scss'
})
export class QueueHandlerComponent {
  inQueue = false
}
