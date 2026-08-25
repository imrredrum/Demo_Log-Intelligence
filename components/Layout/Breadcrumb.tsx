'use client'

import Breadcrumbs, {
  type BreadcrumbsOwnerState,
} from '@mui/material/Breadcrumbs'
import { Container, ContainerOwnProps, Link } from '@mui/material'
import { NextLink } from '../NextLink'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

type BreadcrumbProps = {
  slotProps?: {
    container?: Partial<ContainerOwnProps>
    breadcrumbs?: Partial<BreadcrumbsOwnerState>
  }
}

const Breadcrumb: React.FC<BreadcrumbProps> = props => {
  const pathname = usePathname()

  const breadcrumbItems = useMemo(() => {
    const pathSegments = pathname.split('/').filter(Boolean)
    const displayPath =
      pathSegments.length > 0 ? `${pathSegments.join('/')}` : '/'

    return [
      { label: 'Home', href: '/' },
      ...(displayPath !== '/'
        ? [{ label: displayPath, href: displayPath }]
        : []),
    ]
  }, [pathname])

  return (
    <Container maxWidth={false} {...props.slotProps?.container}>
      <Breadcrumbs
        aria-label='breadcrumb'
        {...props.slotProps?.breadcrumbs}
        sx={{ py: '.5rem', ...props.slotProps?.breadcrumbs?.sx }}
      >
        {breadcrumbItems.map((item, index) => (
          <Link
            key={index}
            component={NextLink}
            sx={{
              textTransform: 'capitalize',
            }}
            {...(index === breadcrumbItems.length - 1
              ? {
                  color: 'text.primary',
                  disabled: true,
                  underline: 'none',
                  href: '#',
                }
              : {
                  color: 'inherit',
                  href: item.href,
                  sx: {
                    '&:hover': { color: 'primary.main' },
                  },
                })}
          >
            {item.label}
          </Link>
        ))}
      </Breadcrumbs>
    </Container>
  )
}

export default Breadcrumb
