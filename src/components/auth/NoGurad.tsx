// ** React Imports


import { useRouter } from 'next/router'
import { ReactNode, ReactElement, useEffect } from 'react'
import auth, { ACCESS_TOKEN, USER_DATA } from 'src/configs/auth'
import { clearLocalUserData } from 'src/helpers/storage'
import { useAuth } from 'src/hooks/useAuth'

interface NoGuard {
  children: ReactNode
  fallback: ReactElement | null
}

const NoGuard = (props: NoGuard) => {
  const { children, fallback } = props

  const authContext = useAuth();


  if(authContext.loading){
    return fallback
  }

  return <>{children}</>
}

export default NoGuard
