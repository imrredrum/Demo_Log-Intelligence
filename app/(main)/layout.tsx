'use client'

import { Breadcrumb, HeaderNav, Sidebar } from '@/components/Layout'
import SourceSystemInitializer from '@/domain/sourceSystem/SourceSystemInitializer'
import { Box, Stack, Toolbar } from '@mui/material'
import { useState } from 'react'

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(true)

  const handleToggleMenu = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <>
      <SourceSystemInitializer />
      <HeaderNav onToggleMenu={handleToggleMenu} />
      <Stack direction='column' sx={{ height: '100dvh' }}>
        <Toolbar />
        <Stack direction='row' sx={{ flex: 1, overflow: 'hidden' }}>
          <Sidebar isOpen={drawerOpen} />
          <Stack
            direction='column'
            component='main'
            sx={{ flex: 1, overflow: 'hidden' }}
          >
            <Breadcrumb
              slotProps={{
                container: { sx: { flexGrow: 0, flexShrink: 0 } },
              }}
            />
            <Box
              sx={{
                flexGrow: 1,
                flexShrink: 1,
                overflow: 'auto',
              }}
            >
              {children}
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}

export default RootLayout
