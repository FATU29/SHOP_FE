// ** React Imports


import { useRouter } from 'next/router'
import { ReactNode, ReactElement, useEffect } from 'react'
import auth, { ACCESS_TOKEN, USER_DATA } from 'src/configs/auth'
import { clearLocalUserData } from 'src/helpers/storage'
import { useAuth } from 'src/hooks/useAuth'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props

  const authContext = useAuth();
  const router = useRouter();

  useEffect(() => {
    //Kiem tra xem first router xong chua, neu chua xong return vi co the luc nay authContext van chua chay xong
    if (!router.isReady) {
      return;
    }

    if (authContext.user === null &&
      !window.localStorage.getItem(ACCESS_TOKEN) &&
      !window.localStorage.getItem(USER_DATA)) {
      

      if (router.asPath !== "/") {
        // query la luu lai duong dan router.asPath neu dang nhap thanh cong se quay lai path query
        router.replace({
          pathname: "/login",
          query: {
            returnUrl: router.asPath
          }
        })
      } else {
        router.replace("/login")
      }
      authContext.setUser(null);
      clearLocalUserData();
    }
  }, [router.route])


  if(authContext.loading || authContext.user === null){
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
