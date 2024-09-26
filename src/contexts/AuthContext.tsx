// ** React Imports
import { createContext, useEffect, useState, ReactNode, useRef } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import { loginAuth, logoutAuth } from 'src/services/auth'
import { API_ENDPOINT } from 'src/configs/api'
import { clearLocalUserData, setLocalUserData, setTemporaryToken } from 'src/helpers/storage'
import { instanceAxios } from 'src/helpers/intercepterAxios'
import { ROUTE_CONFIG } from 'src/configs/route'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  const firstRender = useRef(false)

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName);
      if (storedToken) {
        setLoading(true)
        await instanceAxios(API_ENDPOINT.AUTH.AUTH_ME, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${storedToken}`
          },
        })
          .then((response) => {
            setLoading(false)
            setUser({ ...response.data.data })
          })
          .catch(() => {
            clearLocalUserData();
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
        } else {
          setLoading(false)
        }
      }
        
      if(!firstRender.current){
        initAuth();
        firstRender.current = true
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
    await loginAuth({
      email: params.email,
      password: params.password
    }).then(async response => {
      if (params.rememberMe) {
        params.rememberMe ? setLocalUserData(JSON.stringify(response.data.user), response.data.access_token, response.data.refresh_token)
          : null
      } else {
        setTemporaryToken(response.data.access_token)
      }


      const returnUrl = router.query.returnUrl
      setUser({ ...response.data.user })

      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
      router.replace(redirectURL as string)
    })
      .catch(err => {
        router.replace(`/${ROUTE_CONFIG.LOGIN}`)
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    logoutAuth().then((data) => {
      setUser(null)
      clearLocalUserData();
      router.push('/login')
    });
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
