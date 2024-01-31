import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-home-button',
  standalone: true,
  imports: [],
  templateUrl: './go-home-button.component.html',
  styleUrl: './go-home-button.component.scss'
})
export class GoHomeButtonComponent {
  constructor(private router: Router) { }
  @Input() warningText!: string;

  redirectHome() {
    if(this.warningText) {
      if(!window.confirm(this.warningText)) return
    }

    this.router.navigate(['/'])
  }
}
