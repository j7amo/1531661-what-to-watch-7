import React from 'react';
import './loading-screen.css';

function LoadingScreen() {
  return (
    <div className="lds-spinner" data-testid="loading-spinner">
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
    </div>
  );
}

export default LoadingScreen;
