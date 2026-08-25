import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import {
  AppBar,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { NextLink } from '../NextLink'

type HeaderNavProps = {
  onToggleMenu: () => void
}

const HeaderNav: React.FC<HeaderNavProps> = ({ onToggleMenu }) => (
  <AppBar>
    <Toolbar>
      <Stack
        direction='row'
        spacing={1}
        sx={{
          alignItems: 'center',
          width: 1 / 1,
        }}
      >
        <IconButton color='inherit' onClick={onToggleMenu}>
          <MenuRoundedIcon />
        </IconButton>
        <Link
          component={NextLink}
          href='/'
          color='inherit'
          underline='none'
          title='Back to Home'
        >
          <Typography variant='h6'>Logging Platform</Typography>
        </Link>
      </Stack>
    </Toolbar>
  </AppBar>
)

export default HeaderNav
