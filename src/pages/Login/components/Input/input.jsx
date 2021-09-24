import React from 'react'
import './input.css'

export default function input({type,placeholder}) {
  return (
    <div>
      <input className="input" type={type} placeholder={placeholder} />
    </div>
  )
}
