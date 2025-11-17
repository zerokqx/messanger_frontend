export type FunctionReturn<T> = () => T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Fn<Args extends any[] = any[], T = any> = (...args: Args) => T;
export type ClearParametres<F extends Fn> = () => ReturnType<F>;
