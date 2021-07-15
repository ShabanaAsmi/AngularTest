import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, className: string | string[]) {
    this.snackBar.open(message, '', {
      duration: 3000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: className
    });
  }

}
