import { createModel } from '../../lib/store';

interface State {
  props: any;
}

export const createKAModel = () => {
  return createModel<State>()({
    state: {
      props: {},
    },

    actions: {
      updateProps(state, props: any) {
        return {
          ...state,
          props,
        };
      },
    },
  });
};
