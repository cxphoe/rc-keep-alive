# React KeepAlive 实现

## 缓存组件

通过 decorator 实现

```js
import { keepAlive } from 'rc-keep-alive';

const Test = () => {
  ...
};

const AliveTest = keepAlive(Test, { name: 'test' });
```

## 支持传递 props

在 props 更新的时候，缓存组件也能正常更新

```js
import { keepAlive } from 'rc-keep-alive';

const Test = ({ count, onClick }) => {
  ...
};

// keepAlive(Component, options: { name: string });
// 通过 options.name 设置缓存组件的名字
const AliveTest = keepAlive(Test, { name: 'test' });

const App = () => {
  const [count, setCount] = useState(0);
  
  const onClick = () => {
    setCount(count + 1);
  };
  
  return <AliveTest count={count} onClick={onClick} />
};
```

## 删除组件

通过函数调用删除组件

```js
import { api } from 'rc-keep-alive';

// 参数为缓存组件的名字
api.delete('test');


生命周期
把进入缓存组件、以及离开缓存组件的时间点作为组件的「激活」「失活」的生命周期。通过 useKeepAliveEffect 来对这两个东西进行监听。

支持设置 dependencies。
const Show = ({ count, onClick }: { count: number; onClick: () => void }) => {

  useKeepAliveEffect(() => {
    console.info('[count]', count);
  }, [count]);
  
  useKeepAliveEffect(() => {
    console.log('active');
    
    return () => {
      console.log('disactive');
    };
  });
  
  return <div></div>;
};
```
