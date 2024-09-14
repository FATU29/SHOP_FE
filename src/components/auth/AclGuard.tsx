// ** React Imports
import { ReactNode } from 'react'

// ** Types
import { buildAbilityFor, type ACLObj, type AppAbility } from 'src/configs/acl'
import BlankLayout from 'src/views/layouts/BlankLayout'
import NotAuthorized from 'src/pages/401'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import { AbilityContext } from '../acl/Can'
import { CONFIG_PERMISSIONS } from 'src/configs/permission'

interface AclGuardProps {
  children: ReactNode
  authGuard?: boolean
  guestGuard?: boolean
  aclAbilities: ACLObj
  permission?: string[]
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const { aclAbilities, children, guestGuard = false, authGuard = true, permission } = props


  const auth = useAuth();
  const router = useRouter();
  
  const permissionUser: string[] = auth?.user?.role?.permissions ? (auth?.user?.role?.permissions.includes(CONFIG_PERMISSIONS.BASIC) ?
    [CONFIG_PERMISSIONS.DASHBOARD] : auth?.user?.role?.permissions) : [];



  let ability: AppAbility;

  if (auth.user && !ability) {

    ability = buildAbilityFor(permissionUser, permission);
  }

  if (guestGuard === true || router.route === "/500" || router.route === "/404" || authGuard === false) {
    if (auth.user && ability) {
      return (
        <>
          <AbilityContext.Provider value={ability}>

            {children}

          </AbilityContext.Provider>
        </>
      )
    } else {
      return (
        <>
          {children}
        </>
      )
    }
  }

  if (ability && auth.user && ability.can(aclAbilities.action, aclAbilities.subject)) {
    return (
      <>
        <AbilityContext.Provider value={ability}>

          {children}

        </AbilityContext.Provider>
      </>
    )
  }

  return (
    <>
      <BlankLayout>
        <NotAuthorized></NotAuthorized>
      </BlankLayout>
    </>
  )
}

export default AclGuard
