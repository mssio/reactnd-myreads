// Style copied from codepen by Vasilj Miloevi (https://codepen.io/eboye/pen/gKnLq)

import React from 'react';
import './style.css';

export default function Loading () {
  return (
    <div className='loading-container'>
      <div className="circle"></div>
      <div className="circle-small"></div>
      <div className="circle-big"></div>
      <div className="circle-inner-inner"></div>
      <div className="circle-inner"></div>
    </div>
  );
}
