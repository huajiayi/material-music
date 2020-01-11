import { useLocation, useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { isLogin } from '@/common/utils'
import router from '@/common/router'

export default function useRouterGuard() {
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    const authRoutes = [...router.global, ...router.menu].filter(route => route.meta && route.meta.needLogin)
    authRoutes.some(route => route.path === location.pathname) && !isLogin && history.push('/login')
  }, [history, location])
}