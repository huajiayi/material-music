import React, { useState, useEffect } from 'react'
import './index.scss'
import router from '@/common/router'
import { Switch, Route, useLocation } from 'react-router-dom'
import useCustomLocation, { customLocation } from '@/hook/useCustomLocation'

export default function Main() {

  const location = useLocation()
  useCustomLocation()

  const [localLocation, setLocalLocation] = useState(location)

  useEffect(() => {
    setLocalLocation(customLocation)
  }, [location])

  return (
    <main className="main">
        <Switch location={localLocation}>
          {[...router.menu, ...router.page].map(route => (
            <Route path={route.path} key={route.name} exact={route.exact}>
              <route.component />
            </Route>
          ))}
        </Switch>
    </main>
  )
}