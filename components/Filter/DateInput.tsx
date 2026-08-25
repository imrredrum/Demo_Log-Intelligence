import useFilterStore from '@/domain/filter/store'
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers'
import dayjs from 'dayjs'

const DateInput: React.FC<Partial<DateTimePickerProps>> = props => (
  <DateTimePicker
    disableFuture
    slotProps={{
      textField: {
        size: 'small',
        fullWidth: true,
      },
    }}
    {...props}
  />
)

const BeforeDateInput: React.FC = () => {
  const beforeDate = useFilterStore(s => s.filterGroup.beforeDate)

  return (
    <DateInput
      defaultValue={beforeDate ? dayjs(beforeDate) : null}
      name='beforeDate'
      label='早於'
    />
  )
}

const AfterDateInput: React.FC = () => {
  const afterDate = useFilterStore(s => s.filterGroup.afterDate)

  return (
    <DateInput
      defaultValue={afterDate ? dayjs(afterDate) : null}
      name='afterDate'
      label='晚於'
    />
  )
}

export { BeforeDateInput, AfterDateInput }
