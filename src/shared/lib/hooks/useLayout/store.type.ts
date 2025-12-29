export interface LayoutStoreType {
  asside: boolean;
  header: boolean;
  disable: boolean;
  footer: boolean;
  asideOptions: {
    mode: 'user' | 'none';
  };
}
