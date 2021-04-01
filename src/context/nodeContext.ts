import React from 'react';

interface State {
  id: string;
}

const NodeContext = React.createContext<State>({
  id: '',
});

export default NodeContext;
