import * as React from 'react'
import { styled } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { NextPage } from 'next'
import IconifyIcon from 'src/components/Icon'
import UserDropDown from 'src/views/layouts/components/user-dropdown'
import ModeToggle from './components/mode-toggle'
import LanguageDropDown from './components/language-dropdown'
import { useAuth } from 'src/hooks/useAuth'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { ROUTE_CONFIG } from 'src/configs/route'
import { getAuthMe } from 'src/services/auth'
import FallbackSpinner from 'src/components/fall-back'
import Link from 'next/link'
import CartProducts from './components/cart-product'

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor:
    theme.palette.mode === 'light' ? theme.palette.customColors.lightPaperBg : theme.palette.customColors.darkPaperBg,
  color: theme.palette.primary.main,
  position: 'fixed',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

type TProps = {
  open: boolean
  toggleDrawer: () => void
  isHidden: boolean
}

const HorizontalLayout: NextPage<TProps> = ({ open, toggleDrawer, isHidden }) => {
  const { user, setUser } = useAuth()
  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  const getAuthMeAPI = async () => {
    setIsLoading(true)
    await getAuthMe().then(res => {
      if (res?.data) {
        setUser(res?.data)
      }
      setIsLoading(false)
    })
  }

  React.useEffect(() => {
    getAuthMeAPI()
  }, [user?.avatar])

  return (
    <>
      {!isLoading || (
        <>
          <FallbackSpinner></FallbackSpinner>
        </>
      )}
      <AppBar position='absolute' open={open}>
        <Toolbar
          sx={{
            pr: '24px'
          }}
        >
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' })
            }}
          >
            {!isHidden && (
              <>
                <IconifyIcon
                  icon='ic:round-menu'
                  style={{
                    marginLeft: '5px'
                  }}
                ></IconifyIcon>
              </>
            )}
          </IconButton>
          <Typography component='h1' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
            <Link
              style={{
                textDecoration: 'none',
                color: 'inherit'
              }}
              href={ROUTE_CONFIG.HOME}
            >
              Dashboard
            </Link>
          </Typography>

          {user ? (
            <>
              <ModeToggle></ModeToggle>
              <LanguageDropDown></LanguageDropDown>
              <CartProducts></CartProducts>
              <UserDropDown></UserDropDown>
            </>
          ) : (
            <Button
              variant='contained'
              onClick={() => {
                router.push(`/${ROUTE_CONFIG.LOGIN}`)
              }}
            >
              Log In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default HorizontalLayout
