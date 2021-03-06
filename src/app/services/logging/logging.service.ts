import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {LogEntry} from '../../models/logging/log-entry';
import {LogPublisher} from '../../models/logging/log-publisher';
import {LogLevel, LogPublishers} from '../../models/logging/logLevel.enum';
import {LogConsole} from '../../models/logging/log-console';
import {LogFirestore} from '../../models/logging/log-firestore';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  private readonly logLevel;
  private readonly publishers: LogPublisher[];
  constructor(private readonly firestore: AngularFirestore) {
    this.logLevel = environment.logLevel;
    this.publishers = environment.logPublishers.map(pub => {
      switch (pub) {
        case LogPublishers.Console:
          return new LogConsole();
        break;
        case LogPublishers.Firestore:
          return new LogFirestore(this.firestore);
      }
    });
  }

  log(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.All, optionalParams);
  }

  debug(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Debug, optionalParams);
  }

  info(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  warn(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  error(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Error, optionalParams);
  }

  fatal(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Fatal, optionalParams);
  }

  private writeToLog(msg: string, level: LogLevel, params: any[]) {

    if (this.shouldLog(level)) {

      const logEntry = new LogEntry(level, msg, params);
      // Log the value
      this.publishers.forEach(p => p.log(logEntry));
    }
  }

  private shouldLog(level: LogLevel): boolean {
    let ret = false;
    if ((level >= this.logLevel &&
      level !== LogLevel.Off) ||
      this.logLevel === LogLevel.All) {
      ret = true;
    }
    return ret;
  }

}


