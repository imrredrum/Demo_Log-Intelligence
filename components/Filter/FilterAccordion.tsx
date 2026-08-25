'use client'

import useFilterStore from '@/domain/filter/store'
import useSourceSystemStore from '@/domain/sourceSystem/store'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  accordionSummaryClasses,
  Divider,
  Fade,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { useState } from 'react'

const FilterAccordion: React.FC<React.PropsWithChildren> = ({ children }) => {
  const sourceSystems = useSourceSystemStore(s => s.sourceSystems)
  const filterGroup = useFilterStore(s => s.filterGroup)
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <Accordion
      defaultExpanded
      variant='outlined'
      expanded={isExpanded}
      onChange={(_, expanded) => setIsExpanded(expanded)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreRoundedIcon />}
        sx={{
          flexDirection: 'row-reverse',
          gap: 1,
          [`&.${accordionSummaryClasses.expanded}`]: {
            minHeight: 'unset',
          },
        }}
        slotProps={{
          content: {
            sx: {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              gap: 1,
              alignItems: 'baseline',
              [`&.${accordionSummaryClasses.expanded}`]: {
                my: 1.5,
              },
            },
          },
        }}
      >
        <Typography variant='subtitle1' component='h3' sx={{ flexShrink: 0 }}>
          搜尋條件
        </Typography>
        <Fade in={!isExpanded}>
          <Stack
            direction='row'
            divider={<Divider orientation='vertical' flexItem />}
            spacing={1}
            sx={{
              alignItems: 'center',
              overflow: 'hidden',
              flexShrink: 1,
              '> *:nth-child(odd)': {
                flexShrink: 1,
                flexBasis: 'auto',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              },
            }}
          >
            {filterGroup.type && (
              <Tooltip title={`類型：${filterGroup.type}`}>
                <Typography variant='caption' color='primary'>
                  類型：{filterGroup.type}
                </Typography>
              </Tooltip>
            )}
            {filterGroup.sourceSystem && (
              <Tooltip
                title={`來源系統：${sourceSystems.find(s => s.id === filterGroup.sourceSystem)?.name ?? filterGroup.sourceSystem}`}
              >
                <Typography variant='caption' color='primary'>
                  來源系統：
                  {sourceSystems.find(s => s.id === filterGroup.sourceSystem)
                    ?.name ?? filterGroup.sourceSystem}
                </Typography>
              </Tooltip>
            )}
            {filterGroup.level && (
              <Tooltip title={`等級：${filterGroup.level}`}>
                <Typography variant='caption' color='primary'>
                  等級：{filterGroup.level}
                </Typography>
              </Tooltip>
            )}
            {filterGroup.beforeDate && (
              <Tooltip
                title={`早於：${filterGroup.beforeDate.toLocaleString()}`}
              >
                <Typography variant='caption' color='primary'>
                  早於：{filterGroup.beforeDate.toLocaleString()}
                </Typography>
              </Tooltip>
            )}
            {filterGroup.afterDate && (
              <Tooltip
                title={`晚於：${filterGroup.afterDate.toLocaleString()}`}
              >
                <Typography variant='caption' color='primary'>
                  晚於：{filterGroup.afterDate.toLocaleString()}
                </Typography>
              </Tooltip>
            )}
            {filterGroup.keyword && (
              <Tooltip title={`關鍵字：${filterGroup.keyword}`}>
                <Typography variant='caption' color='primary'>
                  關鍵字：{filterGroup.keyword}
                </Typography>
              </Tooltip>
            )}
          </Stack>
        </Fade>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
}

export default FilterAccordion
