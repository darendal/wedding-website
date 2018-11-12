import {LogPublisher} from './log-publisher';
import {from, Observable} from 'rxjs';
import {LogEntry} from './log-entry';
import {AngularFirestore} from '@angular/fire/firestore';
import {LogLevel} from './logLevel.enum';

interface FirestoreLog {
  level: LogLevel;
  message: string;
  date: number;
}

export class LogFirestore extends LogPublisher {

  private readonly path: string = 'logs';

  constructor(private firestore: AngularFirestore) {
    super();
  }

  clear(): Observable<boolean> {
    return undefined;
  }

  log(record: LogEntry): Observable<boolean> {

    const log: FirestoreLog = {
      level: record.type,
      message: record.buildLogString(),
      date: Date.now()
    };

    return from(this.firestore.collection<FirestoreLog>(this.path).add(log)
      .then(() => true, e => {
      console.error(e);
      return false;
    }));

  }

}
