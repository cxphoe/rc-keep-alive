import {
  DependencyList,
  EffectCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import NodeContext from '../context/nodeContext';
import { globalModel } from '../models/global';
import { useModel } from '../lib/store';
import { KEEPALIVE_NODE_STATUS } from '../decorators/keepAlive/const';

const useKeepAliveEffect = (fn: EffectCallback, deps?: DependencyList) => {
  const { id } = useContext(NodeContext);
  const [{ nodeStatus }] = useModel(globalModel);
  const callbackRef = useRef<any>(null);
  const status = nodeStatus[id];

  const innerDeps = useMemo(() => {
    return [status, ...(deps || [])];
  }, [status, deps]);

  useEffect(() => {
    if (status === KEEPALIVE_NODE_STATUS.MOUNTED) {
      callbackRef.current = fn();
    }

    return () => {
      if (typeof callbackRef.current === 'function') {
        callbackRef.current();
        callbackRef.current = null;
      }
    };
  }, innerDeps);
};

export default useKeepAliveEffect;
