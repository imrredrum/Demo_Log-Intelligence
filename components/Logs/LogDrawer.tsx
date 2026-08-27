'use client'

import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Stack,
  Badge,
} from '@mui/material'
import { resolveColor } from './utils'
import useDetail, { toggleOpen, clearDetail } from './store'
import dayjs from 'dayjs'

const DRAWER_WIDTH = 300

const LogDrawer: React.FC = () => {
  const log = useDetail(s => s.detail)
  const open = useDetail(s => s.open)

  const handleClose = () => {
    toggleOpen(false)
  }

  const clearData = () => {
    clearDetail()
  }

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      onTransitionExited={clearData}
      anchor='right'
    >
      <Box
        sx={{ width: DRAWER_WIDTH, px: 1 }}
        role='presentation'
        onClick={handleClose}
      >
        <List>
          {log ? (
            <>
              <ListItem>
                <ListItemText
                  primary={log.id}
                  secondary='Log ID'
                  slotProps={{
                    root: { sx: { display: 'flex', flexDirection: 'column' } },
                    secondary: { sx: { order: -1 } },
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <Stack
                      direction='row'
                      spacing={1}
                      sx={{ alignItems: 'center', pl: 0.5 }}
                    >
                      <Badge
                        variant='dot'
                        color={resolveColor(log.level)}
                        slotProps={{
                          badge: {
                            sx: {
                              minWidth: 6,
                              height: 6,
                              ...(resolveColor(log.level) === 'default' && {
                                bgcolor: 'grey.500',
                              }),
                            },
                          },
                        }}
                      />
                      <Typography
                        variant='inherit'
                        color={resolveColor(log.level)}
                      >
                        {log.level}
                      </Typography>
                    </Stack>
                  }
                  secondary='Level'
                  slotProps={{
                    root: { sx: { display: 'flex', flexDirection: 'column' } },
                    secondary: { sx: { order: -1 } },
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={log.message}
                  secondary='Message'
                  slotProps={{
                    root: { sx: { display: 'flex', flexDirection: 'column' } },
                    secondary: { sx: { order: -1 } },
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={dayjs(log.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                  secondary='Timestamp'
                  slotProps={{
                    root: { sx: { display: 'flex', flexDirection: 'column' } },
                    secondary: { sx: { order: -1 } },
                  }}
                />
              </ListItem>
            </>
          ) : (
            <ListItem>
              <ListItemText primary='No log selected' />
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  )
}

export default LogDrawer
