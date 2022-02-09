import React from 'react';
import { useAppSelector } from '@redux/store/hooks';
import { loaderSelector } from '@redux/selectors';

const Loader = () => {
  const loading = useAppSelector(loaderSelector);

  if (!loading) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-80"
      style={{ zIndex: 999 }}
    >
      <div className="left-1/2 top-1/2 absolute transform -translate-x-1/2 -translate-y-1/2">
        <div className="spinner-1"></div>
      </div>
    </div>
  );
};

export default Loader;
