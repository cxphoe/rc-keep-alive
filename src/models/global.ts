import KeepAliveNode from '../lib/KeepAliveNode';
import { createModel } from '../lib/store';

interface State {
  nodes: {
    [id: string]: KeepAliveNode;
  };
  nodeStatus: {
    [id: string]: number;
  };
}

export const globalModel = createModel<State>()({
  state: {
    nodes: {},
    nodeStatus: {},
  },
  actions: {
    addNode(state, id: string, node: KeepAliveNode) {
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [id]: node,
        },
      };
    },

    updateNodeStatus(state, id: string, status: number) {
      return {
        ...state,
        nodeStatus: {
          ...state.nodeStatus,
          [id]: status,
        },
      };
    },

    removeNode(state, id: string) {
      const newNodes = { ...state.nodes };
      const node = newNodes[id];
      if (node) {
        delete newNodes[id];
        node.destroy();
      }

      return {
        ...state,
        nodes: newNodes,
      };
    },
  },
});
