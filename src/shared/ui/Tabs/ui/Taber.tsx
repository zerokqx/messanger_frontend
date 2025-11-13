import { Button, Stack, Tabs } from '@mantine/core';
import { motion } from 'motion/react';
import { If } from '../../If';
import { createTabStore } from '../model';
import type {
  TaberProps,
  TaberTemplate,
  TaberTemplateReturn,
  Windows,
} from '../types';
import type { TaberButtons } from '../types/taberButton.type';
import { useEffect, useMemo, type ComponentProps } from 'react';

/**
 * `createTaber` — фабричная функция для создания системы вкладок на базе `@mantine/core/Tabs`.
 *
 * Позволяет управлять активной вкладкой, переключаться между ними и использовать анимацию при смене.
 *
 * @template T - Кортеж строк `windows`, обозначающих идентификаторы вкладок.
 *
 * @param {TaberProps<T>} config - Объект с:
 *   - `windows`: кортеж вкладок (например, ['main', 'settings', 'about'])
 *   - `initial`: стартовая вкладка
 *
 * @returns `[Taber, store, controller, buttons]`:
 *   - `Taber` — компонент для декларативного описания вкладок.
 *   - `store` — хранилище состояния текущей вкладки.
 *   - `controller` — объект с методами `next`, `prev`, `set`.
 *   - `buttons` — готовые кнопки `GoTo` и `Reset`.
 *
 * Визуально `windows` можно представить как "линию" окон:
 * первое окно (`windows[0]`) — главное.
 * Кнопка `Reset` всегда возвращает на это главное окно.
 */
export const createTaber = <T extends Windows>({
  windows,
  initial,
}: TaberProps<T>): TaberTemplateReturn<T> => {
  const useStore = createTabStore<T[number]>(initial);
  const AnimatedPanel = motion.create(Tabs.Panel);
  const Panel: TaberTemplate<T>['Panel'] = ({
    autoSet,
    children,
    animationVariant = 'left-right',
    value,
    ...props
  }) => {
    const cur = useStore.useCurrentTab();
    const set = useStore.useSetCurrentTab();
    useEffect(() => {
      if (!autoSet) return;
      if (value === cur) return;
      set(value);
    }, [autoSet, cur, value, set]);

    type Animations = ComponentProps<
      TaberTemplate<T>['Panel']
    >['animationVariant'];
    // TODO: Сделать анимации
    // const animation = useMemo(() => {
    //   const animations: Record<Animations, { initial: object; whileInView: object }> = {
    //     'top-down': { initial: { y: '-20px', opacity: 0 }, whileInView: { y: '0px', opacity: 1 } },
    //     'down-top': { initial: { y: '20px', opacity: 0 }, whileInView: { y: '0px', opacity: 1 } },
    //     'right-left': { initial: { x: '20%', opacity: 0 }, whileInView: { x: '0%', opacity: 1 } },
    //     'left-right': { initial: { x: '-20%', opacity: 0 }, whileInView: { x: '0%', opacity: 1 } },
    //   };
    return (
      <AnimatedPanel
        key={value}
        initial={{
          x: '-5%',
        }}
        whileInView={{
          x: '0%',
        }}
        value={value}
        {...props}
      >
        <Stack>{children}</Stack>
      </AnimatedPanel>
    );
  };
  const GoToButton: TaberButtons<T>['GoTo'] = ({ children, resetTo }) => {
    const setCurrentTab = useStore.useSetCurrentTab();

    return (
      <Button
        onClick={() => {
          setCurrentTab(resetTo);
        }}
        children={children}
      />
    );
  };
  const ResetButton: TaberButtons<T>['Reset'] = ({ children }) => {
    const reset = useStore.useReset();
    return <Button onClick={reset} children={children} />;
  };
  const Buttons: TaberButtons<T> = {
    GoTo: GoToButton,
    Reset: ResetButton,
  };

  const OnlyOnTab: TaberTemplate<T>['OnlyOnTab'] = ({ on, children }) => {
    const currentTab = useStore.useCurrentTab();
    return (
      <If operandFirst={on} operandSecond={currentTab}>
        {children}
      </If>
    );
  };

  const Taber: TaberTemplate<T> = ({ children }) => {
    const currentTab = useStore.useCurrentTab();
    return <Tabs value={currentTab}>{children}</Tabs>;
  };

  Taber.OnlyOnTab = OnlyOnTab;
  Taber.Panel = Panel;

  return [Taber, useStore, Buttons, () => windows[0]];
};
