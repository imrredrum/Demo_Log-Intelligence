import {
  ELogLevel,
  ELogType,
  EMethod,
  type LogEntry,
} from '@/domain/log/schema'
import { MOCK_SOURCE_SYSTEMS } from './data'

const sleep = <T = void>(ms: number = 3000, value?: T) =>
  new Promise<T>(resolve =>
    setTimeout(() => {
      resolve(value as T)
    }, ms),
  )

const randomPastTimestamp = (maxDaysAgo: number = 30): Date => {
  const now = new Date()
  const pastTime =
    now.getTime() - Math.floor(Math.random() * maxDaysAgo * 24 * 60 * 60 * 1000)
  return new Date(pastTime)
}

const generateRandomLogs = (count: number): LogEntry[] => {
  const logs: LogEntry[] = []
  const logTypes = Object.values(ELogType)
  const logLevels = Object.values(ELogLevel)
  const logMethods = Object.values(EMethod)
  for (let i = 0; i < count; i++) {
    const randomLogType = logTypes[Math.floor(Math.random() * logTypes.length)]
    logs.push({
      id: `log-${i}`,
      timestamp: randomPastTimestamp(),
      level: logLevels[Math.floor(Math.random() * logLevels.length)],
      message: `這是一條模擬的日誌消息 ${i}`,
      sourceSystem:
        MOCK_SOURCE_SYSTEMS[
          Math.floor(Math.random() * MOCK_SOURCE_SYSTEMS.length)
        ].id,
      ...(() => {
        switch (randomLogType) {
          case ELogType.Application:
            return {
              type: ELogType.Application,
              computerName: `Computer-${Math.ceil(i / 10)}`,
              applicationName: `App-${Math.ceil(i / 20)}`,
              threadId: `Thread-${Math.ceil(i / 5)}`,
            }
          case ELogType.System:
            return {
              type: ELogType.System,
              computerName: `Computer-${Math.ceil(i / 10)}`,
              errorCode: `ErrorCode-${Math.ceil(i / 15)}`,
              lineInformation: `Line ${Math.ceil(i / 3)} in File${Math.ceil(i / 7)}.js`,
            }
          case ELogType.Http:
            return {
              type: ELogType.Http,
              computerName: `Computer-${Math.ceil(i / 10)}`,
              status: 200 + (i % 5) * 100,
              method: logMethods[i % logMethods.length],
              path: `/api/resource/${i}`,
              requestUrl: `https://example.com/api/resource/${i}`,
              response: `Response ${i}`,
            }
          default:
            return {}
        }
      })(),
    } as LogEntry)
  }
  return logs
}

export { sleep, randomPastTimestamp, generateRandomLogs }
