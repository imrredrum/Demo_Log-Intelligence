import type { LogEntry } from '@/domain/log/schema'
import { create } from 'zustand'

type DetailStore = {
  detail: LogEntry | null
  open: boolean
}

const initialState: DetailStore = {
  detail: null,
  open: false,
}

const useDetail = create<DetailStore>(() => initialState)

export default useDetail

export const setDetail = (newDetail: LogEntry | null) => {
  useDetail.setState({ detail: newDetail, open: newDetail !== null })
}

export const toggleOpen = (open: boolean) => {
  useDetail.setState({ open })
}

export const clearDetail = () => {
  useDetail.setState({ detail: null })
}
