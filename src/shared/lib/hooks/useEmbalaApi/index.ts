import type { Fn } from '@/shared/types/utils/functions';
import type { EmblaCarouselType } from 'embla-carousel';
import { useState, type Dispatch, type SetStateAction } from 'react';

export const useEmblaApi = (): [
  Dispatch<SetStateAction<EmblaCarouselType | null>>,
  {
    next: Fn<[], void>;
    prev: Fn<[], void>;
  },
] => {
  const [embla, setEmbala] = useState<EmblaCarouselType | null>(null);
  const handeles = {
    next: () => embla?.scrollNext(),
    prev: () => embla?.scrollPrev(),
  };
  return [setEmbala, handeles];
};
