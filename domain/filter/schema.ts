import type { LogEntry } from '../log/schema'

export type FilterGroup = {
  keyword?: string
  type?: LogEntry['type']
  afterDate?: Date
  beforeDate?: Date
  sourceSystem?: LogEntry['sourceSystem']
  level?: LogEntry['level']
}
