'use client'

import useFilterStore from '@/domain/filter/store'
import { ELogLevel } from '@/domain/log/schema'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const LEVEL_OPTIONS = Object.entries(ELogLevel).map(([key, value]) => ({
  label: key,
  value,
}))

const LevelSelect: React.FC = () => {
  const level = useFilterStore(s => s.filterGroup.level)

  return (
    <FormControl fullWidth size='small'>
      <InputLabel id='level-select-label'>等級</InputLabel>
      <Select
        labelId='level-select-label'
        id='level-select'
        label='等級'
        name='level'
        defaultValue={level ?? ''}
      >
        {LEVEL_OPTIONS.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default LevelSelect
