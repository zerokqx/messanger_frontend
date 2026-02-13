export interface TabsDeclaration {}
export type TabsDeclarationKeys = keyof TabsDeclaration;

export interface TabsNested {
  onDrillDown: (from: TabsDeclarationKeys) => void;
}
