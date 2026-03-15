import { Group, Text, type GroupProps   } from '@mantine/core';
import { formatLogin } from '../format-login';

interface FormatLoginProps extends GroupProps {
  login?: string | null;
  customName?: string | null;
}
export const FormatLogin = ({
  login,
  customName,
  ...props
}: FormatLoginProps) => {
  const { name } = formatLogin(login, customName);

  return (
    <Group  {...props} gap={'xs'} miw={0} wrap='nowrap'  >
      <Text span truncate miw={0} >
        {name}
      </Text>
      {customName && (
        <Text  c="dimmed" span>
          @{login}
        </Text>
      )}
    </Group>
  );
};
