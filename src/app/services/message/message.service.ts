import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {LoggingService} from '../logging/logging.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messagesToDisplay: string[] = [];
  isProcessing = false;

  constructor(private snackbar: MatSnackBar, private log: LoggingService) {}

  showMessage(message: string): void {
    this.messagesToDisplay.push(message);
    if (!this.isProcessing) {
      this.processMessage();
    }
  }

  private processMessage() {
    if (this.messagesToDisplay.length > 0) {
      this.isProcessing = true;
      this.snackbar.open(this.messagesToDisplay.pop(), 'Close', {duration: 5000}).afterDismissed()
        .toPromise().then(() => this.processMessage());
    } else {
      this.isProcessing = false;
    }
  }
}
