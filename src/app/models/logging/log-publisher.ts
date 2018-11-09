import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {LogEntry} from './log-entry';

export abstract class LogPublisher {
  protected location: string;
  abstract log(record: LogEntry): Observable<boolean>;
  abstract clear(): Observable<boolean>;
}
