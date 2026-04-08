import { useCallback, useEffect, useState } from 'react';

export const useParalelImageLoad = (
  urlFirst: string | undefined,
  urlSecond: string | undefined
) => {
  const [src, setSrc] = useState(urlFirst);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const image = new Image();
    if (!urlSecond) return;
    image.src = urlSecond;
    image.onload = () => {
      setIsLoading(() => true);
      setSrc(urlSecond);
      setIsLoading(() => false);
    };
    image.onerror = () => {
      setIsError(true);
      setIsLoading(false);
    };
  }, [urlSecond, urlFirst]);
  return { isError, isLoading, src };
};
