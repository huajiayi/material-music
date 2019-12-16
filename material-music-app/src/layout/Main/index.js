import React from 'react'
import './index.scss'
import { Switch, Route } from "react-router-dom"
import router from '@/common/router'

export default function Main() {
  return (
    <main className="main">
        <Switch>
          {router.map(route => (
            <Route path={route.path} key={route.name} exact={route.exact}>
              <route.component />
            </Route>
          ))}
        </Switch>
    </main>
  )
}