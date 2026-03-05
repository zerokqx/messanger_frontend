type FunctionReturn<T> = () => T;
 
export type Fn<Args extends any[] = any[], T = any> = (...args: Args) => T;
type ClearParametres<F extends Fn> = () => ReturnType<F>;

type FnP<F extends Fn, T extends number> = Parameters<F>[T];
