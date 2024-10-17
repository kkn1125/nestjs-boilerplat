import dayjs from 'dayjs';
import { capitalize } from './capitalize';

export class Logger {
  private context: string = 'system';
  private readonly levels = ['log', 'info', 'debug', 'warn', 'error'] as const;
  private readonly icons = ['🪵', '✨', '🐛', '⚠️', '🔥'] as const;

  private get timestamp() {
    return dayjs().format('H:mm:ss.SSS');
  }

  log: Console['log'];
  info: Console['info'];
  debug: Console['debug'];
  warn: Console['warn'];
  error: Console['error'];

  constructor(context?: string) {
    if (context) {
      this.context = context;
    }
  }

  update(context?: string) {
    if (context) {
      this.context = context;
    }
    for (const index in this.levels) {
      const level = this.levels[index];
      const icon = this.icons[index];
      Object.defineProperty(this, level, {
        get() {
          const timestamp = this.timestamp;
          return console.log.bind(
            this,
            `${icon} [${level.toUpperCase()}] [${capitalize(context)}] ${timestamp}`,
          );
        },
      });
    }
  }
}
