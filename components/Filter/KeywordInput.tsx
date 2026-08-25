import useFilterStore from '@/domain/filter/store'
import { TextField } from '@mui/material'

const KeywordInput: React.FC = () => {
  const keyword = useFilterStore(s => s.filterGroup.keyword)

  return (
    <TextField
      size='small'
      label='關鍵字'
      name='keyword'
      variant='outlined'
      defaultValue={keyword}
      fullWidth
    />
  )
}

export default KeywordInput
