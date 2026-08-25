import { create } from 'zustand'
import type { LogEntry } from './schema'

export type LogStore = {
  logs: LogEntry[]
  isLoading: boolean
}

const initialState: LogStore = {
  logs: [],
  isLoading: false,
}

export const useLogsStore = create<LogStore>(() => ({
  ...initialState,
}))

export const setLogs = (newLogs: LogEntry[]) => {
  useLogsStore.setState({ logs: newLogs })
}

export const addLogs = (newLogs: LogEntry[]) => {
  useLogsStore.setState(prev => ({
    logs: [...prev.logs, ...newLogs],
  }))
}

export const clearLogs = () => {
  useLogsStore.setState({ logs: [] })
}

export const updateLogsLoading = (isLoading: boolean) => {
  useLogsStore.setState({ isLoading })
}
