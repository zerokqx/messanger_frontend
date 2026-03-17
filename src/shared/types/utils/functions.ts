// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Fn<Args extends any[] = any[], T = any> = (...args: Args) => T;
