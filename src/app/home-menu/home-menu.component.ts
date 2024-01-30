import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-menu',
  standalone: true,
  imports: [],
  templateUrl: './home-menu.component.html',
  styleUrl: './home-menu.component.scss'
})
export class HomeMenuComponent {
  constructor(private router: Router) {}

  redirectToReplay() {
    this.router.navigate(['/replay'])
  }

  redirectToGameMenu() {
    this.router.navigate(['/game-menu'])
  }
}
