import { TIMESTAMP_FORMAT } from '@common/variable';
import * as dayjs from 'dayjs';

export class Logger<
  T extends object | (new (...args: any[]) => object) = object,
> {
  private context: string = 'System';
  private readonly levels = ['log', 'info', 'debug', 'warn', 'error'] as const;
  private readonly icons = ['🪵', '✨', '🐛', '⚠️', '🔥'] as const;

  private get timestamp() {
    return dayjs().format(TIMESTAMP_FORMAT);
  }

  log: Console['log'];
  info: Console['info'];
  debug: Console['debug'];
  warn: Console['warn'];
  error: Console['error'];

  constructor(context?: string | T) {
    this.update(context);
  }

  update(context?: string | T) {
    if (typeof context === 'string') {
      this.context = context;
    } else if (typeof context === 'object') {
      this.context = context.constructor.name;
    }
    for (const index in this.levels) {
      const level = this.levels[index];
      const icon = this.icons[index];
      Object.defineProperty(this, level, {
        get() {
          const timestamp = this.timestamp;
          return console.log.bind(
            this,
            `${icon} [${level.toUpperCase()}] [${this.context}] ${timestamp}`,
          );
        },
      });
    }
  }
}
