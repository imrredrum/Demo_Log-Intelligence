import { SourceSystem } from '../sourceSystem/schema'

export enum ELogType {
  Application = 'application',
  System = 'system',
  Http = 'http',
}

export enum ELogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

export type GeneralLogEntry = {
  id: string
  timestamp: Date
  sourceSystem: SourceSystem['id']
  computerName: string
  level: ELogLevel
  message: string
}

export type ApplicationLogEntry = GeneralLogEntry & {
  type: ELogType.Application
  applicationName: string
  threadId: string
}

export type SystemLogEntry = GeneralLogEntry & {
  type: ELogType.System
  errorCode: string
  lineInformation: string
}

export enum EMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
}

export type HttpLogEntry = GeneralLogEntry & {
  type: ELogType.Http
  status: number
  method: EMethod
  path: string
  requestUrl: string
  response: string
}

export type LogEntry = ApplicationLogEntry | SystemLogEntry | HttpLogEntry
