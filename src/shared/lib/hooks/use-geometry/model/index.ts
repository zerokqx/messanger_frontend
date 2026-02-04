import { useEffect, useState, type RefObject } from 'react';

export const useGeometry = <T extends HTMLElement = HTMLDivElement>(
  ref?: RefObject<T>
) => {
  const [geometry, setGeometry] = useState<{ w: number; h: number }>({
    w: 0,
    h: 0,
  });
  useEffect(() => {
    if (ref?.current) {
      const { clientWidth: w, clientHeight: h } = ref.current;
      setGeometry({ w, h });
    }
  }, [ref]);
  return geometry;
};
