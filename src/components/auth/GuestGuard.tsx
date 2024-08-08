// ** React Imports
import { useRouter } from 'next/router'
import { ReactNode, ReactElement, useEffect } from 'react'
import { ACCESS_TOKEN, USER_DATA } from 'src/configs/auth'
import { useAuth } from 'src/hooks/useAuth'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props

  const authContext = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    
    if (window.localStorage.getItem(ACCESS_TOKEN) && window.localStorage.getItem(USER_DATA)) {
      router.replace("/")
    }
  }, [router.isReady, router.route])

  if (authContext.loading) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard
