import { ELogLevel, type LogEntry } from '@/domain/log/schema'

export const resolveColor = (level: LogEntry['level']) => {
  switch (level) {
    case ELogLevel.ERROR:
      return 'error'
    case ELogLevel.WARN:
      return 'warning'
    case ELogLevel.INFO:
    case ELogLevel.DEBUG:
      return 'default'
  }
}
