import React, { useEffect, useRef } from 'react';
import NodeContext from '../../context/nodeContext';
import KeepAliveNode from '../../lib/KeepAliveNode';
import { useModel } from '../../lib/store';
import { getNodeId } from '../../utils';
import { globalModel } from '../../models/global';
import { KEEPALIVE_NODE_STATUS } from './const';
import { createKAModel } from './model';

const getKeepAliveComponentID = (Comp: any): string | undefined => {
  return Comp.__keepalive_id;
};

const setKeepAliveComponentID = (Comp: any, id: string) => {
  Comp.__keepalive_id = id;
};

const keepAlive = function <P>(
  Component: React.FC<P>,
  options: {
    name?: string;
  } = {},
) {
  const model = createKAModel();
  let keepAliveId = getKeepAliveComponentID(Component)!;

  if (!keepAliveId) {
    const { name } = options;
    keepAliveId = name || getNodeId();
    setKeepAliveComponentID(Component, keepAliveId);
  }

  // 用于缓存的组件
  const Cached = () => {
    const [{ props: modelProps }] = useModel(model);

    return (
      <NodeContext.Provider value={{ id: keepAliveId }}>
        <Component {...modelProps} />
      </NodeContext.Provider>
    );
  };

  // 暴露给外层使用的组件接口
  const Wrapped: React.FC<P> = (props: P) => {
    const { updateProps } = useModel(model)[1];
    const { addNode, updateNodeStatus } = useModel(globalModel)[1];
    const ref = useRef<HTMLDivElement>(null);

    // 把 props 存入全局
    useEffect(() => {
      updateProps(props);
    }, [props]);

    useEffect(() => {
      const { nodes } = globalModel.getState();
      const mountTarget = ref.current!;
      let node = nodes[keepAliveId];

      if (!node) {
        node = new KeepAliveNode(<Cached />);
        addNode(keepAliveId, node);

        node.render();
        updateNodeStatus(keepAliveId, KEEPALIVE_NODE_STATUS.RENDERED);
      }

      // node.render 是个异步过程，node 挂载的时候需要保证 node 已经 render 完毕
      // 用 setTimeout 来进行保证
      setTimeout(() => {
        node.mount(mountTarget);
        updateNodeStatus(keepAliveId, KEEPALIVE_NODE_STATUS.MOUNTED);
      }, 0);

      return () => {
        node.unmount();
        updateNodeStatus(keepAliveId, KEEPALIVE_NODE_STATUS.UNMOUNTED);
      };
    }, []);

    return <div data-wrapped="1" ref={ref}></div>;
  };

  return Wrapped;
};

export default keepAlive;
