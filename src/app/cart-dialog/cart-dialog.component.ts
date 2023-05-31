import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css']
})
export class CartDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CartDialogComponent>,
    private router: Router
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
    this.dialogRef.close();
  }
}