import React from 'react';
import './title.css';

export default function title({text}) {
  return (
    <div className="title-container">
      <h1 className="title-h1">{text}</h1>
    </div>
  )
}
