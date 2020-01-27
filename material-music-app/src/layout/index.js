import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './index.scss'
import Header from './Header'
import Menu from './Menu'
import Main from './Main'
import Player from '@/components/Player'
import useRouterGuard from '@/hook/useRouterGuard'
import { isEmptyObj } from '@/common/utils'

export default function Layout() {

  useRouterGuard()

  const playerWrap = useRef(null)

  const currentSong = useSelector(state => state.musicReducer.currentSong)

  useEffect(() => {
    if(!isEmptyObj(currentSong)) {
      playerWrap.current.style.bottom = '0'
      document.documentElement.style.setProperty('--bottom-height', '60px')
    }else {
      playerWrap.current.style.bottom = '-70px'
      document.documentElement.style.setProperty('--bottom-height', '0')
    }
  }, [currentSong])

  return (
    <>
      <div className="layout">
        <Menu />
        <div className="container">
          <Header />
          <Main />
        </div>
      </div>
      <div ref={playerWrap} className="player-wrap">
        <Player />
      </div>
    </>
  )
}