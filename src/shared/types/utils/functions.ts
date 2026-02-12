export type FunctionReturn<T> = () => T;
 
export type Fn<Args extends any[] = any[], T = any> = (...args: Args) => T;
export type ClearParametres<F extends Fn> = () => ReturnType<F>;

export type FnP<F extends Fn, T extends number> = Parameters<F>[T];
