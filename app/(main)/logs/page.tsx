import Filter from '@/components/Filter'
import { LogDrawer, LogsList } from '@/components/Logs'
import {} from '@/components/Logs'
import { Box, Container, Typography } from '@mui/material'

const LogsPage: React.FC = () => (
  <Container maxWidth={false}>
    <Typography variant='h4' component='h1' gutterBottom>
      Logs Page
    </Typography>

    <Box component='section' sx={{ maxWidth: 'md' }}>
      <Filter />
    </Box>

    <Box component='section' sx={{ mt: 1, pb: 2, maxWidth: 'md' }}>
      <LogsList />
      <LogDrawer />
    </Box>
  </Container>
)

export default LogsPage
