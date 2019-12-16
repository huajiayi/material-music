import React from 'react'
import './index.scss'

export default function Title({ children }) {

  return (
    <div className="title-wrap">
      <span className="title">{children}</span>
    </div>
  )
}