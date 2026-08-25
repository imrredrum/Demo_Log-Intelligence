'use client'

import useFilterStore from '@/domain/filter/store'
import { clearLogs, setLogs, updateLogsLoading } from '@/domain/log/store'
import { MOCK_LOGS } from '@/mock/data'
import { sleep } from '@/mock/utils'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import useSWR from 'swr'

const LogsLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const filterGroup = useFilterStore(s => s.filterGroup)

  const { isLoading } = useSWR(
    Object.values(filterGroup).filter(Boolean).length
      ? `fetch-logs-${JSON.stringify(filterGroup)}`
      : null,
    async () => {
      let filteredLogs = MOCK_LOGS
      if (filterGroup.type)
        filteredLogs = filteredLogs.filter(log => log.type === filterGroup.type)
      if (filterGroup.level)
        filteredLogs = filteredLogs.filter(
          log => log.level === filterGroup.level,
        )
      if (filterGroup.sourceSystem)
        filteredLogs = filteredLogs.filter(
          log => log.sourceSystem === filterGroup.sourceSystem,
        )
      if (filterGroup.beforeDate)
        filteredLogs = filteredLogs.filter(log =>
          dayjs(log.timestamp).isBefore(filterGroup.beforeDate),
        )
      if (filterGroup.afterDate)
        filteredLogs = filteredLogs.filter(log =>
          dayjs(log.timestamp).isAfter(filterGroup.afterDate),
        )
      if (filterGroup.keyword)
        filteredLogs = filteredLogs.filter(log =>
          log.message.includes(filterGroup.keyword!),
        )
      return await sleep(3000, filteredLogs)
    },
    {
      onSuccess: logs => {
        setLogs(logs)
      },
    },
  )

  useEffect(() => {
    updateLogsLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    if (!Object.values(filterGroup).filter(Boolean).length) clearLogs()
  }, [filterGroup])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
  )
}

export default LogsLayout
