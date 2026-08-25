'use client'

import { Button as MuiButton, Grid, styled, Divider } from '@mui/material'
import { useRef, useState } from 'react'
import KeywordInput from './KeywordInput'
import { AfterDateInput, BeforeDateInput } from './DateInput'
import TypeSelect from './TypeSelect'
import SourceSystemSelect from './SourceSystemSelect'
import LevelSelect from './LevelSelect'
import { updateFilterGroup } from '@/domain/filter/store'
import AdditionalActions from './AdditionalActions'

const Button = styled(MuiButton)({
  height: '100%',
})

const FilterForm: React.FC = () => {
  const [formVersion, setFormVersion] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)

  const handleReset = () => {
    setFormVersion(v => v + 1)
  }

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const entries = Object.fromEntries(formData.entries())
    updateFilterGroup(entries)
    handleReset()
  }

  return (
    <Grid
      container
      spacing={2}
      key={formVersion}
      component='form'
      onReset={handleReset}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <Grid size={4}>
        <TypeSelect />
      </Grid>
      <Grid size={4}>
        <SourceSystemSelect />
      </Grid>
      <Grid size={4}>
        <LevelSelect />
      </Grid>
      <Grid size={6}>
        <BeforeDateInput />
      </Grid>
      <Grid size={6}>
        <AfterDateInput />
      </Grid>
      <Grid size='grow'>
        <KeywordInput />
      </Grid>
      <Grid size='auto'>
        <Button type='submit' variant='contained' disableElevation>
          搜尋
        </Button>
      </Grid>
      <Grid size='auto'>
        <Button type='reset' variant='outlined'>
          重置
        </Button>
      </Grid>
      <Divider variant='middle' orientation='vertical' flexItem />
      <Grid size='auto'>
        <AdditionalActions callback={handleReset} formRef={formRef} />
      </Grid>
    </Grid>
  )
}

export default FilterForm
