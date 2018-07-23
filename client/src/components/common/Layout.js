import React from 'react'

export function Layout({ children }) {
  return (
    <div className="mw9-ns mw6 center pt5 pt6-ns flex flex-column items-center justify-center ph2">
      {children}
      <div className="self-center mt4">
        <p className="b code f5">
          Problems? Reach out via Twitter{' '}
          <a href="https://twitter.com/corderophi678" target="_blank" rel="noopener noreferrer">@corderophi678</a>
        </p>
      </div>
    </div>
  )
}
