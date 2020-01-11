import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useEvent } from 'react-use'
import { percent, range } from '@/common/utils'
import './index.scss'

export default function ProgressBar({ value, onChange }) {

  const [isTouched, setIsTouched] = useState(false)

  const progressBar = useRef(null)
  const progress = useRef(null)
  const progressBtn = useRef(null)

  const offset = useCallback(value => {
    progress.current.style.width = `${value}px`
    progressBtn.current.style.left = `${value}px`
  }, [])

  const event = useCallback(e => {
    const progressBarWidth = progressBar.current.offsetWidth
    switch(e.type) {
      case 'mousedown':
        setIsTouched(true)
        break
      case 'mouseup':
        const rect = progressBar.current.getBoundingClientRect()
        const offsetWidth = range(e.pageX - rect.left - 2, 0, progressBar.current.clientWidth)
        const percentage = percent(offsetWidth, progressBarWidth)
        if(isTouched) {
          offset(offsetWidth)
          onChange(percentage)
        } 
        setIsTouched(false)
        break
      case 'mouseout':
        if(isTouched) offset(value)
        setIsTouched(false)
        break
      default:
        break
    }
    
  }, [isTouched, offset, onChange, value])

  useEvent('mousedown', event, progressBar.current)
  useEvent('mouseup', event, progressBar.current)
  useEvent('mouseout', event, progressBar.current)

  useEffect(() => {
    const offsetWidth = range(progressBar.current.clientWidth * (value / 100) - 2, 0, progressBar.current.clientWidth)
    offset(offsetWidth)
  }, [offset, value])

  return (
    <div ref={progressBar} className="progress-bar">
      <div ref={progressBtn} className="progress-btn"></div>
      <div ref={progress} className="progress"></div>
    </div>
  )
}