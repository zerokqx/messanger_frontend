import { useProfilePut } from '@/features/profilePut';
import { useAuth } from '@/shared/model/authProviderContext';
import { notifications } from '@mantine/notifications';
import { usePutUserData } from '../lib/usePutUserData';
import { sidebarTab } from '../model/tab';
import { useTranslation } from 'react-i18next';
import { useAppForm } from '@/shared/ui/Form/ui/FormV2/FormV2';

export const ProfileEdit = () => {
  const { t } = useTranslation(['sideBar', 'fieldLabels', 'buttonLabels']);
  const { bio } = usePutUserData();
  const { mutate } = useProfilePut();
  const { user } = useAuth();
  const [, useStore] = sidebarTab;
  const goBack = useStore.useGoBack();
  const form = useAppForm({
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
      <form.AppForm>
        <form.Form>
          <form.Vertical>
            <form.AppField
              name="bio"
              children={(field) => (
                <field.TextArea rows={4} label={t('fieldLabels:bio_label')} />
              )}
            />
            <form.DirtyButton type="submit" children={t('buttonLabels:save')} />
          </form.Vertical>
        </form.Form>
      </form.AppForm>
      {/* <fo */}
      {/*   title="Редактирование профиля" */}
      {/*   buttonLabel="Сохранить изменения" */}
      {/*   options={options} */}
      {/*   fieldSet={[ */}
      {/*     { */}
      {/*       name: 'bio', */}
      {/*       fieldName: 'Биография', */}
      {/*       label: true, */}
      {/*       placeholder: 'Я учусь в колледже на 4 курсе и...', */}
      {/*       component: (field, props, handlers) => ( */}
      {/*         <Textarea */}
      {/*           placeholder={props.placeholder} */}
      {/*           rows={4} */}
      {/*           {...handlers} */}
      {/*         /> */}
      {/*       ), */}
      {/*     }, */}
      {/*   ]} */}
      {/* /> */}
      {/* <Space h={'1rem'} /> */}
      {/* <DescText p={'md'} bdrs={'xl'} bd={bd} size="sm"> */}
      {/*   Можно использовать a-z, 0-9 и подчёркивания. Минимальная длина — 3 */}
      {/*   символа, максимальная — 32. Логин не может начинаться с подчёркивания */}
      {/*   или содержать двойные подчёркивания. */}
      {/* </DescText> */}
    </Taber.Panel>
  );
};
