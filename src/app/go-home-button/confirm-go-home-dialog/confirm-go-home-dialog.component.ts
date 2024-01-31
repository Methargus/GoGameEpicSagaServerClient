import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; // Import the necessary module

@Component({
  selector: 'app-confirm-go-home-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirm-go-home-dialog.component.html',
  styleUrl: './confirm-go-home-dialog.component.scss'
})
export class ConfirmGoHomeDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }, public dialogRef: MatDialogRef<ConfirmGoHomeDialogComponent>) {}
}
