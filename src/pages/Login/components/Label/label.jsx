import React from 'react';
import './label.css'

export default function label({text}) {
  return (
    <div className="div-label">
      <label className="label">{text}</label>
    </div>
  )
}
