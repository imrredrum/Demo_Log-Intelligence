'use client'

import useFilterStore from '@/domain/filter/store'
import type { LogEntry } from '@/domain/log/schema'
import { setDetail } from './store'
import { useLogsStore } from '@/domain/log/store'
import useSourceSystemStore from '@/domain/sourceSystem/store'
import {
  Chip,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import dayjs from 'dayjs'
import { useState } from 'react'
import { resolveColor } from './utils'

const SIZE_OPTIONS = [10, 25, 100] as const

const LoadingSkeleton: React.FC = () => (
  <TableRow>
    <TableCell width={185}>
      <Skeleton variant='text' width='80%' />
    </TableCell>
    <TableCell width={98}>
      <Skeleton variant='text' width='80%' />
    </TableCell>
    <TableCell width={105}>
      <Skeleton variant='text' width='80%' />
    </TableCell>
    <TableCell width={100}>
      <Skeleton variant='text' width='80%' />
    </TableCell>
    <TableCell width={200}>
      <Skeleton variant='text' width='80%' />
    </TableCell>
  </TableRow>
)

const LogsList = () => {
  const isFiltered = useFilterStore(s =>
    Object.values(s.filterGroup).some(Boolean),
  )
  const sourceSystems = useSourceSystemStore(s => s.sourceSystems)
  const logs = useLogsStore(s => s.logs)
  const loading = useLogsStore(s => s.isLoading)

  const [offset, setOffset] = useState(0)
  const [size, setSize] = useState<(typeof SIZE_OPTIONS)[number]>(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setOffset(newPage * size)
  }

  const handleChangeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(+event.target.value as (typeof SIZE_OPTIONS)[number])
    setOffset(0)
  }

  const displayLogs = logs.slice(offset, offset + size)

  const handleRowClick = (log: LogEntry) => () => {
    setDetail(log)
  }

  return (
    <>
      <TableContainer
        sx={{
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          maxHeight: '70dvh',
          overflow: 'auto',
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell width={185}>時間</TableCell>
              <TableCell width={98}>等級</TableCell>
              <TableCell width={105}>類型</TableCell>
              <TableCell width={100}>來源系統</TableCell>
              <TableCell>訊息</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from({ length: size }).map((_, idx) => (
                <LoadingSkeleton key={idx} />
              ))
            ) : logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align='center'>
                  {isFiltered
                    ? 'No logs match the filter criteria'
                    : 'Enter filter criteria to view logs'}
                </TableCell>
              </TableRow>
            ) : (
              <>
                {displayLogs.map(log => (
                  <TableRow
                    key={log.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={handleRowClick(log)}
                  >
                    <TableCell width={185}>
                      {dayjs(log.timestamp).format('YYYY-MM-DD hh:mm:ss A')}
                    </TableCell>
                    <TableCell width={98}>
                      <Chip
                        size='small'
                        variant='outlined'
                        label={log.level}
                        color={resolveColor(log.level)}
                      />
                    </TableCell>
                    <TableCell width={105}>{log.type}</TableCell>
                    <TableCell width={100}>
                      {sourceSystems.find(s => s.id === log.sourceSystem)
                        ?.name ?? log.sourceSystem}
                    </TableCell>
                    <TableCell>{log.message}</TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        size='small'
        rowsPerPageOptions={SIZE_OPTIONS}
        component='div'
        count={logs.length}
        rowsPerPage={size}
        page={offset / size}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeSize}
      />
    </>
  )
}

export default LogsList
