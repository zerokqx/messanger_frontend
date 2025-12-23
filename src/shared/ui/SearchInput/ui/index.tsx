import { useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { debounceTime, filter, Subject } from 'rxjs';
import { TextInput } from '@mantine/core';
import type { SearchInputProp } from '../types/searchInput.type';

export const SearchInput = ({ action, ...props }: SearchInputProp) => {
  const searchSubject = useRef(new Subject<string>()).current;

  useEffect(() => {
    const sub = searchSubject
      .pipe(
        debounceTime(1000),
        filter((v) => {
          return v.length >= 3;
        })
      )
      .subscribe((value) => {
        action(value);
      });
    return () => {
      sub.unsubscribe();
    };
  }, [action, searchSubject]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchSubject.next(e.target.value);
  };

  return (
    <TextInput
      onChange={handleChange}
      leftSection={<Search />}
      placeholder="Поиск"
      {...props}
    />
  );
};
