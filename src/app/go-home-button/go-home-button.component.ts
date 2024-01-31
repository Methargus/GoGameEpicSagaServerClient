import { Component, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ConfirmGoHomeDialogComponent } from './confirm-go-home-dialog/confirm-go-home-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-go-home-button',
  standalone: true,
  imports: [],
  templateUrl: './go-home-button.component.html',
  styleUrl: './go-home-button.component.scss'
})
export class GoHomeButtonComponent {
  constructor(private router: Router, public dialog: MatDialog, private ngZone: NgZone) { }
  @Input() warningText!: string;

  redirectHome() {
    if(!this.warningText) this.router.navigate(['/']);
    if(this.warningText) {
      const dialogRef = this.dialog.open(ConfirmGoHomeDialogComponent, {
        data: { message: this.warningText },
        width: '500px',
        height: '350px'
      });

      dialogRef.afterClosed().pipe(first()).subscribe(result => {
        if(result) {
          this.ngZone.run(() => {
            this.router.navigate(['/']);
          })
        }
      });
    }
  }
}
