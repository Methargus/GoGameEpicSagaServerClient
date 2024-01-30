import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QueueServiceService } from '../shared/queue-service.service';
import { Router } from '@angular/router';
import { GameMenuComponent } from "../game-menu/game-menu.component";

@Component({
    selector: 'app-queue-handler',
    standalone: true,
    templateUrl: './queue-handler.component.html',
    styleUrl: './queue-handler.component.scss',
    imports: [CommonModule, GameMenuComponent]
})
export class QueueHandlerComponent {
  constructor(queueService: QueueServiceService, private router: Router) {
    // queueService.joinQueue().subscribe(() => {
    //   this.router.navigate(['/game'])
    // })
  }
  
  redirect() {
    this.router.navigate(['/game'])
  }
  inQueue = false
}
