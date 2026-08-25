'use client'

import { resetFilterGroup, updateFilterGroup } from '@/domain/filter/store'
import useSourceSystemStore from '@/domain/sourceSystem/store'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import { Divider, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import { useMemo, useState } from 'react'

const STORED_CONDITIONS_KEY = 'saved-filter'

const AdditionalActions: React.FC<{
  callback?: () => void
  formRef: React.RefObject<HTMLFormElement | null>
}> = ({ callback, formRef }) => {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null)
  const sourceSystems = useSourceSystemStore(s => s.sourceSystems)

  const [storedConditions, setStoredConditions] = useState<Record<
    string,
    string
  > | null>(() => {
    if (typeof localStorage === 'undefined') return null
    const stored = localStorage.getItem(STORED_CONDITIONS_KEY)
    if (!stored) return null
    return JSON.parse(stored)
  })

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget)
  }

  const handleClose = () => {
    setAnchor(null)
  }

  const handleClear = () => {
    resetFilterGroup()
    callback?.()
  }

  const handleSave = () => {
    console.log(formRef?.current)
    if (!formRef?.current) return
    const formData = new FormData(formRef.current)
    const entries = Object.fromEntries(formData.entries())
    localStorage.setItem(STORED_CONDITIONS_KEY, JSON.stringify(entries))
    setStoredConditions(entries as Record<string, string>)
  }

  const handleLoad = () => {
    if (!storedConditions) return
    updateFilterGroup(storedConditions)
    callback?.()
  }

  const TooltipTitle = useMemo(() => {
    let title = ''
    if (storedConditions?.type) title += `類型：${storedConditions.type}、`
    if (storedConditions?.sourceSystem)
      title += `來源系統：${sourceSystems.find(s => s.id === storedConditions.sourceSystem)?.name ?? storedConditions.sourceSystem}、`
    if (storedConditions?.level) title += `等級：${storedConditions.level}、`
    if (storedConditions?.beforeDate)
      title += `早於：${storedConditions.beforeDate.toLocaleString()}、`
    if (storedConditions?.afterDate)
      title += `晚於：${storedConditions.afterDate.toLocaleString()}、`
    if (storedConditions?.keyword)
      title += `關鍵字：${storedConditions.keyword}、`
    if (title.endsWith('、')) title = title.slice(0, -1)
    return title
  }, [storedConditions, sourceSystems])

  return (
    <>
      <IconButton onClick={handleOpen} edge='start'>
        <MoreVertRoundedIcon />
      </IconButton>
      <Menu open={Boolean(anchor)} anchorEl={anchor} onClose={handleClose}>
        <MenuItem onClick={handleSave}>儲存輸入條件</MenuItem>
        <Tooltip disableHoverListener={!TooltipTitle} title={TooltipTitle}>
          <MenuItem onClick={handleLoad} disabled={!storedConditions}>
            載入條件並搜尋
          </MenuItem>
        </Tooltip>
        <Divider />
        <MenuItem onClick={handleClear}>清空</MenuItem>
      </Menu>
    </>
  )
}

export default AdditionalActions
