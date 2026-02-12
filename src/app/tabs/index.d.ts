import '@/shared/ui/query-tabs';
declare module '@/shared/ui/query-tabs' {
  interface TabsDeclaration {
    tnavbar:
      | 'main'
      | 'contacts'
      | 'settings'
      | 'search'
      | 'profile'
      | 'profile-edit';
    tsettings: 'interface' | 'main' | 'sessions';
  }
}
