'use client'

import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import LineStyleRoundedIcon from '@mui/icons-material/LineStyleRounded'
import {
  Drawer as MuiDrawer,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  styled,
  drawerClasses,
} from '@mui/material'
import { usePathname } from 'next/navigation'
import { NextLink } from '../NextLink'

type TSidebarProps = {
  isOpen: boolean
}

const DRAWER_WIDTH = 240

export const MENU_ITEM = [
  {
    label: 'Dashboard',
    href: '/',
    Icon: HomeRoundedIcon,
  },
  {
    label: 'Logs',
    href: '/logs',
    Icon: LineStyleRoundedIcon,
  },
] as const

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})<{
  open?: boolean
}>(({ theme }) => ({
  flexShrink: 0,
  whiteSpace: 'nowrap',
  [`&, & .${drawerClasses.paper}`]: {
    boxSizing: 'border-box',
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  variants: [
    {
      props: ({ open }) => open === true,
      style: {
        width: DRAWER_WIDTH,
        [`& .${drawerClasses.paper}`]: {
          width: DRAWER_WIDTH,
        },
      },
    },
    {
      props: ({ open }) => open === false,
      style: {
        width: `calc(${theme.spacing(7)} + 1px)`,
        [`& .${drawerClasses.paper}`]: {
          width: `calc(${theme.spacing(7)} + 1px)`,
        },
      },
    },
  ],
}))

const Sidebar: React.FC<TSidebarProps> = ({ isOpen }) => {
  const pathname = usePathname()

  return (
    <Drawer
      variant='permanent'
      anchor='left'
      open={isOpen}
      sx={{
        position: 'relative',
        height: 'stretch',
        zIndex: theme => theme.zIndex.appBar - 1,
        [`& .${drawerClasses.paper}`]: {
          position: 'absolute',
          height: 'stretch',
        },
      }}
    >
      <MenuList>
        {MENU_ITEM.map(item => (
          <MenuItem
            key={item.href}
            component={NextLink}
            href={item.href}
            color='black'
            selected={pathname === item.href}
            sx={{
              minHeight: 48,
              px: 2.5,
              justifyContent: isOpen ? 'initial' : 'center',
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: 'center',
                mr: isOpen ? 3 : 0,
                transition: theme =>
                  theme.transitions.create('margin-right', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
              }}
            >
              <item.Icon />
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              sx={{
                opacity: isOpen ? 1 : 0,
                transition: theme =>
                  theme.transitions.create('opacity', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
              }}
            />
          </MenuItem>
        ))}
      </MenuList>
    </Drawer>
  )
}

export default Sidebar
