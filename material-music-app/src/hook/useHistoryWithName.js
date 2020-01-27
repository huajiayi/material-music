import { useHistory } from 'react-router-dom'
import router from '@/common/router'

export default function useHistoryWithName() {

  const history = useHistory()

  const _history = {
    ...history,
    push(path) {
      if(router.global.some(route => route.path === path)) {
        history.push(path)
        return
      }

      let route
      if(path.split('/').length > 2) {
        const _path = '/' + path.split('/')[1] // /user/1 -> /user
        route = [...router.menu, ...router.page].find(route => route.path.indexOf(_path) > -1)
      }else {
        route = [...router.menu, ...router.page].find(route => route.path === path)
      }
      history.push(path, {name: route.name})
    }
  }

  return _history
}