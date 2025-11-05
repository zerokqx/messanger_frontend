export type Inject<T extends object> = () => T;
export interface InjectProp<T extends object> {
  inject: Inject<T>;
}
