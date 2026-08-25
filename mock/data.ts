import { type LogEntry } from '@/domain/log/schema'
import type { SourceSystem } from '@/domain/sourceSystem/schema'
import { generateRandomLogs } from './utils'

const MOCK_SOURCE_SYSTEMS: SourceSystem[] = [
  { id: '1', name: '系統 A' },
  { id: '2', name: '系統 B' },
  { id: '3', name: '系統 C' },
]

const MOCK_LOGS: LogEntry[] = generateRandomLogs(100)

export { MOCK_SOURCE_SYSTEMS, MOCK_LOGS }
