import { create } from 'zustand'
import type { SourceSystem } from './schema'

export type SourceSystemStore = {
  sourceSystems: SourceSystem[]
  isLoading: boolean
}

const useSourceSystemStore = create<SourceSystemStore>(() => ({
  sourceSystems: [],
  isLoading: false,
}))

export default useSourceSystemStore

export const setSourceSystems = (sourceSystems: SourceSystem[]) => {
  useSourceSystemStore.setState({ sourceSystems })
}

export const updateSourceSystemLoading = (isLoading: boolean) => {
  useSourceSystemStore.setState({ isLoading })
}
