import { SetStateAction, Dispatch } from 'react';

export interface Actions<T> {
  [key: string]: (state: T, ...payload: any[]) => T | Promise<T>;
}

/** 获取 state 之外的参数 */
export type ActionParams<F extends (...args: any) => any> = F extends (state: any, ...rest: infer R) => any ? R : never;

export interface CreateStoreOptions<T, AS extends Actions<T>> {
  state: T;
  actions: AS;
}

export type StoreActions<AS extends Actions<any>> = {
  [key in keyof AS]: (...payload: ActionParams<AS[key]>) => (void | Promise<void>);
}

export type DispatchFn<T> = Dispatch<SetStateAction<T>>;

export interface Store<T, AS extends Actions<T>> {
  getState(): T;
  actions: StoreActions<AS>;
  addDispatch(fn: DispatchFn<T>): void;
  removeDispatch(fn: DispatchFn<T>): void;
}
