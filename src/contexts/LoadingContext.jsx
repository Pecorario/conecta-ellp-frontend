import React, { createContext, useState, useCallback } from 'react';

const LoadingContext = createContext({});

function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = useCallback(() => {
    setIsLoading(true);
  }, []);

  const hideLoader = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}
    </LoadingContext.Provider>
  );
}

export { LoadingProvider, LoadingContext };