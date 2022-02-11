import React from 'react';

function LoadingSpinner() {
  return (
    <div
      style={{ borderTopColor: 'transparent' }}
      className="w-16 h-16 border-4 border-secondary-dark border-solid rounded-full animate-spin"
    ></div>
  );
}

export default LoadingSpinner;
