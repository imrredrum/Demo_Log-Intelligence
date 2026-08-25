import { Container, Typography } from '@mui/material'

const RootPage: React.FC = () => {
  return (
    <Container maxWidth={false}>
      <Typography variant='h4' component='h1' gutterBottom>
        Welcome to the Root Page
      </Typography>
      <Typography variant='body1'>
        This is the main entry point of the application.
      </Typography>
    </Container>
  )
}

export default RootPage
