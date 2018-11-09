import {LogLevel} from './logLevel.enum';

export class LogEntry {

  type: LogLevel;
  message: string;
  params: string;

  constructor(type: LogLevel, message: string, params: any[]) {
    this.type = type;
    this.message = message;
    this.params = this.formatParams(params);
  }

  buildLogString(): string {

    let value = new Date() + ' - ';

    value += 'Type: ' + this.type;
    value += ' - Message: ' + this.message;
    if (this.params.length) {
      value += ' - Extra Info: ' + this.params;
    }
    return value;
  }

  private formatParams(params: any[]): string {
    let ret: string = params.join(',');

    // Is there at least one object in the array?
    if (params.some(p => typeof p === 'object')) {
      ret = '';
      // Build comma-delimited string
      for (const item of params) {
        ret += JSON.stringify(item) + ',';
      }
    }
    return ret;
  }
}
