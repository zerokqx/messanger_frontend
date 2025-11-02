import { CircleQuestionMark } from 'lucide-react';
import { useCallback, useMemo, useState, type ReactNode } from 'react';
import type { DisplayProp } from '../types/display.type';
import type { NoticeCompouned, Status } from '../types/notice.type';
import { Notice } from '../ui';
import { AnimatePresence } from 'motion/react';
import { Group } from '@mantine/core';

type WrapperDisplayProp = Omit<DisplayProp, 'onClick' | 'children'>;

type NoticeBox = () => ReactNode;
type WrapperDisplay = (props: WrapperDisplayProp) => ReactNode;
export type UseNotice = (
  initial: Status,
  displayProps?: WrapperDisplayProp
) => [NoticeCompouned, NoticeBox];

export const useNotice: UseNotice = (initial) => {
  const [status, setStatus] = useState<Status>(initial);

  const toggle = useCallback(() => {
    setStatus(!status);
  }, [status]);

  const NoticeWrapper: NoticeCompouned = useMemo(() => {
    const Component: NoticeCompouned = (props) => {
      return <Notice {...props} />;
    };

    Component.Display = (props: WrapperDisplayProp) => {
      return (
        <Notice.Display onClick={toggle} {...props}>
          <CircleQuestionMark />
        </Notice.Display>
      );
    };

    return Component;
  }, [status, toggle]);
  const NoticeBox = () => {
    return (
      <Group pos={'relative'}>
        <AnimatePresence>{status && <NoticeWrapper />}</AnimatePresence>
        <NoticeWrapper.Display />
      </Group>
    );
  };

  return [NoticeWrapper, NoticeBox];
};
