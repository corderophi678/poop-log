import React from 'react'

export function Button({ type, onClick, label, classes, primary, danger }) {
  type = typeof type === 'string' ? type : 'button'
  let color = primary
    ? 'navy b--navy'
    : danger
      ? 'dark-red b--dark-red'
      : 'dark-green b--dark-green'
  return (
    <button
      type={type}
      className={`bg-transparent link grow br-pill ba bw2 ph3 pv2 mh2 dib ${color} pointer f6 fw6 ${classes &&
        classes.join(' ')}`}
      onClick={onClick}>
      {label}
    </button>
  )
}
