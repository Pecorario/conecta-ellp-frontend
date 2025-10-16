import { useContext } from 'react';
import { LoadingContext } from '@/contexts/LoadingContext.jsx';

export function useLoading() {
  const context = useContext(LoadingContext);
  return context;
}