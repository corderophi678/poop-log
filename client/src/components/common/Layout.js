import React from 'react'

export function Layout({children}) {
  return (
    <div className="mw9-ns mw6 center pt5 pt6-ns flex flex-column items-center justify-center ph2">
      {children}
    </div>
  )
}
