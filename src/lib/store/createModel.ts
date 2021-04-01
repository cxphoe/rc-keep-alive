import { Actions, CreateStoreOptions, Store, DispatchFn, ActionParams } from './type';

export const createModel = <S>() => <AS extends Actions<S>>({
  state,
  actions,
}: CreateStoreOptions<S, AS>): Store<S, AS> => {
  type Dispatch = DispatchFn<S>;
  type ActionKeys = keyof AS;

  const exposedActions: {
    [key in ActionKeys]: (...payload: ActionParams<AS[key]>) => (void | Promise<void>);
  } = {} as any;

  let globalState = {
    ...state,
  };
  const dispatchFunctions: Dispatch[] = [];

  for (const key of Object.keys(actions)) {
    exposedActions[key as any] = (...args) => {
      const result = actions[key](globalState, ...args);
      globalState = {
        ...globalState,
        ...result,
      };
      for (const fn of dispatchFunctions) {
        fn(globalState);
      }
    };
  }

  const addDispatch = (fn: Dispatch) => {
    dispatchFunctions.push(fn);
  };

  const removeDispatch = (fn: Dispatch) => {
    const index = dispatchFunctions.indexOf(fn);
    if (index > -1) {
      dispatchFunctions.splice(index, 1);
    }
  };

  const getState = () => {
    return globalState;
  };

  return {
    getState,
    actions: exposedActions,
    addDispatch,
    removeDispatch,
  };
};
