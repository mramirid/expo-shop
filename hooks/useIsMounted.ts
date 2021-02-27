import { useCallback, useEffect, useRef } from 'react';

export default function useIsMounted() {
  const isMountedRef = useRef(true);

  const isMounted = useCallback(() => isMountedRef.current, []);

  const runInMounted = useCallback((callback: () => void) => {
    if (isMountedRef.current) {
      callback();
    }
  }, []);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return {
    isMounted,
    runInMounted,
  };
}
