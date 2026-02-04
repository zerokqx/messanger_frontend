import { ContactsList } from '@/widgets/contact-list';
import { SideBarTaber } from '../../model/tab';
export const ContactsTab = () => {
  return (
    <SideBarTaber.Panel value="contacts">
      <ContactsList />
    </SideBarTaber.Panel>
  );
};
