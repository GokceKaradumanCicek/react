import React from 'react';

import './Card.module.css';

const LoadingSpinner = () => {
    console.log("SPINNER");
return  <div className="lds-ring">
    <div />
    <div />
    <div />
    <div />
  </div>
}

export default LoadingSpinner;