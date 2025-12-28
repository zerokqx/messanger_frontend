import { SideBarTaber } from '../../model/tab';
import { List } from '@/entities/contact/ui/List';
export const ContactsTab = () => {
  return (
    <SideBarTaber.Panel value="contacts">
      <List />
    </SideBarTaber.Panel>
  );
};
