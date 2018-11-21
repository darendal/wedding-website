import {LogPublisher} from './log-publisher';
import {LogEntry} from './log-entry';
import {Observable, of} from 'rxjs';
import {LogLevel} from './logLevel.enum';

export class LogConsole extends LogPublisher {

  log(entry: LogEntry): Observable<boolean> {

    // Log to console
    switch (entry.type) {
      case LogLevel.Error:
        console.error(entry.buildLogString());
        break;
      default:
        console.log(entry.buildLogString());
    }
    return of(true);
  }
  clear(): Observable<boolean> {
    console.clear();
    return of(true);
  }
}
