'use client'

import useFilterStore from '@/domain/filter/store'
import { ELogType } from '@/domain/log/schema'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const TYPE_OPTIONS = Object.entries(ELogType).map(([key, value]) => ({
  label: key,
  value,
}))

const TypeSelect: React.FC = () => {
  const type = useFilterStore(s => s.filterGroup.type)

  return (
    <FormControl fullWidth size='small'>
      <InputLabel id='type-select-label'>類型</InputLabel>
      <Select
        labelId='type-select-label'
        id='type-select'
        label='類型'
        name='type'
        defaultValue={type ?? ''}
      >
        {TYPE_OPTIONS.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default TypeSelect
