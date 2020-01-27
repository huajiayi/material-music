import React from 'react'

export default function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      {...other}
    >
      <div style={{display: value === index ? 'block': 'none'}}>{children}</div>
    </div>
  )
}