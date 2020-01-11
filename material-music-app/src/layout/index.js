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
    playerWrap.current.style.bottom = !isEmptyObj(currentSong) ? '0' : '-70px'
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