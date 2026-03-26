import type { Fn } from "./functions";

export type HofFn<T extends Fn> =  (...args: Parameters<T>)=> ReturnType<T>


