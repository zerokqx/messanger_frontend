import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { MantineProvider } from '@mantine/core';
import { userEvent } from 'vitest/browser';
import { ContactCard } from './contact-item';
test('renders name', async () => {
  let onRemove = false;
  const { getByText } = await render(
    <ContactCard
      onClick={() => {
        console.log('Click');
      }}
      onRemove={() => {
        onRemove = true;
        console.log('onRemove clicked');
      }}
      user={{
        user_id: '498870a9-5e86-43f5-969c-17be84c8b817',
        login: 'admin',
        created_at: '2026-02-21',
        custom_name: 'dima',
        last_seen_at: '2026-02-21',
        friend_code: false,
        full_name: '',
      }}
    />,
    { wrapper: ({ children }) => <MantineProvider>{children}</MantineProvider> }
  );
  const card = getByText('admin');
  await expect.element(card).toBeInTheDocument();
  await expect.element(getByText('contact-remove')).not.toBeInTheDocument();
  await userEvent.click(card, { button: 'right' });
  const menuBtn = getByText('contact-remove');
  await expect.element(menuBtn).toBeVisible();
  await menuBtn.click();
  expect(onRemove).toBeTruthy();
});
