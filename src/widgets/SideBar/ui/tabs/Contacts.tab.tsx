import { useContactsList } from '@/features/contactsList';
import { SideBarTaber } from '../../model/tab';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { useContactCount } from '@/features/contactCount';
export const ContactsTab = () => {
  const parentRef = useRef(null);
  // const { data: count } = useContactCount();
  const virtualizer = useVirtualizer({
    // count: count ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
  });
  // const contacts = useContactsList(10, 1);
  return (
    <>
      <SideBarTaber.Panel value="contacts"></SideBarTaber.Panel>
    </>
  );
};
