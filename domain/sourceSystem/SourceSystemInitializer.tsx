'use client'

import { MOCK_SOURCE_SYSTEMS } from '@/mock/data'
import { sleep } from '@/mock/utils'
import { useEffect } from 'react'
import useSWRImmutable from 'swr/immutable'
import { setSourceSystems, updateSourceSystemLoading } from './store'

const SourceSystemInitializer: React.FC = () => {
  // 模擬從 API 獲取來源系統選項
  const { data, isLoading } = useSWRImmutable(
    'fetch-source-systems',
    async () => {
      return await sleep(2000, MOCK_SOURCE_SYSTEMS)
    },
  )

  useEffect(() => {
    if (!data) return
    setSourceSystems(data)
  }, [data])

  useEffect(() => {
    updateSourceSystemLoading(isLoading)
  }, [isLoading])

  return null
}

export default SourceSystemInitializer
