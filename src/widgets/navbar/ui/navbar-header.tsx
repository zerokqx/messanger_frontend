import { type TextInputProps } from '@mantine/core';

export const NavbarHeader = ({
  input,
}: {
  input?: Partial<TextInputProps>;
}) => {
  return (
    <p>dwd</p>
    // <m.div exit={{ y: -100 }} ref={headerRef} animate={{ y: [-100, 0] }}>
    //   <Stack gap={'0'}>
    //     <Group p="xs" wrap="nowrap">
    //       <AnimatePresence mode="popLayout" initial={false}>
    //         {!showButtonBack && (
    //           <m.div
    //             key="button-menu"
    //             initial={{ scale: 0, opacity: 0 }}
    //             animate={{ scale: 1, opacity: 1 }}
    //             exit={{ scale: 0, opacity: 0 }}
    //           >
    //             <Menu>
    //               <MenuTarget>
    //                 <Burger />
    //               </MenuTarget>
    //             </Menu>
    //           </m.div>
    //         )}
    //         {showButtonBack && (
    //           <m.div
    //             key="button-back"
    //             initial={{ scale: 0, opacity: 0 }}
    //             animate={{ scale: 1, opacity: 1 }}
    //             exit={{ scale: 0, opacity: 0 }}
    //             style={{ display: 'flex' }}
    //           >
    //             <ActionIcon
    //               bdrs="xl"
    //               variant="light"
    //               onClick={() => tabs.tabsHistoryAction.doBack('tnavbar')}
    //               aria-label="Назад"
    //             >
    //               <ArrowLeft />
    //             </ActionIcon>
    //           </m.div>
    //         )}
    //       </AnimatePresence>
    //       <m.div key="search" style={{ flex: 1 }}>
    //         <SearchInputWrapper
    //           styles={{ input: { borderRadius: '100px' } }}
    //           bdrs={'xl'}
    //           flex={1}
    //           {...input}
    //         />
    //       </m.div>
    //     </Group>
    //
    //     <AnimatePresence initial={false} mode="popLayout">
    //       {showNavbarPanel && (
    //         <m.div
    //           key={'tnavbar-links'}
    //           animate={{
    //             y: 0,
    //             opacity: 1,
    //           }}
    //           initial={{
    //             y: -5,
    //             zIndex: 1000,
    //             opacity: 0,
    //           }}
    //           exit={{
    //             y: -5,
    //             opacity: 0,
    //           }}
    //         >
    //           <QuickLinks
    //             activeValue={currentNavbar}
    //             onClickAnyLink={(v) => {
    //               tabs.tabsHistoryAction.doPush('tnavbar', v);
    //             }}
    //             links={quickTabs}
    //           />
    //         </m.div>
    //       )}
    //     </AnimatePresence>
    //   </Stack>
    // </m.div>
  );
};
