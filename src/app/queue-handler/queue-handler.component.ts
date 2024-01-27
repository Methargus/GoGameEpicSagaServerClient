import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QueueServiceService } from '../shared/queue-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-queue-handler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './queue-handler.component.html',
  styleUrl: './queue-handler.component.scss'
})
export class QueueHandlerComponent {
  constructor(queueService: QueueServiceService, private router: Router) {
    queueService.joinQueue().subscribe(() => {
      this.router.navigate(['/game'])
    })
  }
  
  inQueue = false
}
