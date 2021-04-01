import { useState, useEffect } from 'react';
import { Actions, Store, StoreActions } from './type';

export const useModel = <S, AS extends Actions<any>>({
  getState,
  actions,
  addDispatch,
  removeDispatch,
}: Store<S, AS>) => {
  const [innerState, updateState] = useState(getState());

  useEffect(() => {
    addDispatch(updateState);

    return () => {
      removeDispatch(updateState);
    };
  }, []);

  return [innerState, actions] as [S, StoreActions<AS>];
};
