'use client'

import useFilterStore from '@/domain/filter/store'
import useSourceSystemStore from '@/domain/sourceSystem/store'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const SourceSystemSelect: React.FC = () => {
  const { sourceSystems, isLoading } = useSourceSystemStore(s => s)
  const sourceSystem = useFilterStore(s => s.filterGroup.sourceSystem)

  return (
    <FormControl fullWidth size='small'>
      <InputLabel id='source-system-select-label'>
        {isLoading ? 'Loading...' : '來源系統'}
      </InputLabel>
      <Select
        labelId='source-system-select-label'
        id='source-system-select'
        label={isLoading ? 'Loading...' : '來源系統'}
        name='sourceSystem'
        defaultValue={sourceSystem ?? ''}
        disabled={isLoading}
      >
        {sourceSystems?.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SourceSystemSelect
