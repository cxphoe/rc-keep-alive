import ReactDOM from 'react-dom';

class KeepAliveNode {
  element: HTMLElement;
  reactChildren: React.ReactElement;

  static conatiner: HTMLElement | null = null;

  static mountContainer() {
    const dom = document.createElement('div');
    dom.style.display = 'none';
    document.body.appendChild(dom);
    return dom;
  }

  constructor(children: React.ReactElement) {
    this.element = document.createElement('div');
    this.reactChildren = children;
    this.init();
  }

  init() {
    if (!KeepAliveNode.conatiner) {
      const dom = KeepAliveNode.mountContainer();
      KeepAliveNode.conatiner = dom;
    }
  }

  render() {
    const container = KeepAliveNode.conatiner!;
    const { element, reactChildren } = this;

    ReactDOM.render(reactChildren, element, () => {
      container.appendChild(element);
    });
  }

  mount(target: HTMLElement) {
    const { element } = this;

    target.append(element);
  }

  unmount() {
    const container = KeepAliveNode.conatiner!;
    const { element } = this;

    container.appendChild(element);
  }

  destroy() {
    this.element.remove();

    return;
    const res = ReactDOM.unmountComponentAtNode(this.element);
    if (res) {
      this.element.remove();
    } else {
      const message = '删除 keepAlive 组件失败';
      throw new Error(message);
    }
  }
}

export default KeepAliveNode;
