import 'dayjs/locale/pt-br'
import { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Calendar } from '@mui/x-date-pickers/internals/components/icons'
import { InputAdornment } from '@mui/material'
import dayjs from 'dayjs'

interface FormDatePickerProps {
  registerOnForm: (value: string) => void
}

const FormDatePicker = (props: FormDatePickerProps) => {
  const { registerOnForm } = props

  const [value, setValue] = useState<string | null>(null)

  const handleDatePickerChange = (value: string | null) => {
    if (value) {
      setValue(value)
      registerOnForm(dayjs(value).format('DD/MM/YYYY'))
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <DatePicker
        views={['year', 'month', 'day']}
        openTo='year'
        disableFuture
        yearsPerRow={4}
        monthsPerRow={4}
        slotProps={{
          textField: {
            InputProps: {
              endAdornment: (
              <InputAdornment position="end">
                <Calendar />
              </InputAdornment>
              )
            },
            disabled: true
          }
        }}
        defaultValue={null}
        label="Data de nascimento"
        value={value}
        onChange={(newValue) => { handleDatePickerChange(newValue) }} />
    </LocalizationProvider>
  )
}

export default FormDatePicker
