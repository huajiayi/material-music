import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import router from '@/common/router'
import { isEmptyObj } from '@/common/utils'
import useHistoryWithName from './useHistoryWithName'

export let customLocation = {}

export default function useCustomLocation() {
  const location = useLocation()
  const history = useHistoryWithName()

  useEffect(() => {
    router.global.some(route => route.path === location.pathname) && isEmptyObj(customLocation) && history.push('/') // 防止一开始直接进入model页时没有数据
    !router.global.some(route => route.path === location.pathname) && (customLocation = location)
  }, [history, location])
}
