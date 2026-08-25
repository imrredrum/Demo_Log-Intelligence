import { create } from 'zustand'
import type { FilterGroup } from './schema'

export type FilterStore = {
  filterGroup: FilterGroup
}

const useFilterStore = create<FilterStore>(() => ({
  filterGroup: {},
}))

export default useFilterStore

export const setFilterGroup = ({
  beforeDate,
  afterDate,
  ...rest
}: FilterGroup) => {
  useFilterStore.setState({
    filterGroup: {
      ...rest,
      beforeDate: beforeDate ? new Date(beforeDate) : undefined,
      afterDate: afterDate ? new Date(afterDate) : undefined,
    },
  })
}

export const updateFilterGroup = ({
  beforeDate,
  afterDate,
  ...rest
}: Partial<FilterGroup>) => {
  useFilterStore.setState({
    filterGroup: {
      ...rest,
      beforeDate: beforeDate ? new Date(beforeDate) : undefined,
      afterDate: afterDate ? new Date(afterDate) : undefined,
    },
  })
}

export const resetFilterGroup = () => {
  useFilterStore.setState({ filterGroup: {} })
}
