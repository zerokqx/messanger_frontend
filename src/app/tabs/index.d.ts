import '@/shared/ui/query-tabs';
declare module '@/shared/ui/query-tabs' {
  interface TabsDeclaration {
    'tnavbar.main': 'main' | 'contacts' | 'search';
    tnavbar:
      | 'main'
      | 'settings'
      | 'profile'
      | 'profile.edit'
      | 'settings.interface';
  }
}
