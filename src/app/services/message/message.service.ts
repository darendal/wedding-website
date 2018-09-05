import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackbar: MatSnackBar) { }

  showMessage(message: string): void {
    this.snackbar.open(message, 'Close', {duration: 5000});
  }
}
