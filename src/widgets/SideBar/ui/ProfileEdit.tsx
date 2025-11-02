import { useProfilePut } from '@/features/profilePut';
import { useAuth } from '@/shared/model/authProviderContext';
import { DescText } from '@/shared/ui/Description/ui/DescText';
import { Form } from '@/shared/ui/Form';
import { useBorder } from '@/widgets/Settings';
import { Space, Textarea, useMantineTheme } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { formOptions } from '@tanstack/react-form';
import { usePutUserData } from '../lib/usePutUserData';
import { sidebarTab } from '../model/tab';

export const ProfileEdit = () => {
  const t = useMantineTheme();
  const bd = useBorder('.1rem');
  const { login, bio, fullName } = usePutUserData();
  const { mutate } = useProfilePut();
  const { user } = useAuth();
  const [, useStore] = sidebarTab;
  const goBack = useStore.useGoBack();
  const options = formOptions({
    defaultValues: {
      bio,
    },
    onSubmit(props) {
      mutate(
        {
          body: {
            bio: props.value.bio,
          },
        },
        {
          onSuccess(_, { body: { bio } }) {
            if (bio != null) user.setBio(bio);
            notifications.show({
              message: 'Профиль изменен',
            });

            goBack();
          },
        }
      );
    },
  });

  const [Taber] = sidebarTab;

  return (
    <Taber.Panel value="profile_edit">
      <Form
        title="Редактирование профиля"
        buttonLabel="Сохранить изменения"
        options={options}
        fieldSet={[
          {
            name: 'bio',
            fieldName: 'Биография',
            label: true,
            placeholder: 'Я учусь в колледже на 4 курсе и...',
            component: (field, props, handlers) => (
              <Textarea
                placeholder={props.placeholder}
                rows={4}
                {...handlers}
              />
            ),
          },
        ]}
      />
      <Space h={'1rem'} />
      <DescText p={'md'} bdrs={'xl'} bd={bd} c={t.colors.dark[2]} size="sm">
        Можно использовать a-z, 0-9 и подчёркивания. Минимальная длина — 3
        символа, максимальная — 32. Логин не может начинаться с подчёркивания
        или содержать двойные подчёркивания.
      </DescText>
    </Taber.Panel>
  );
};
