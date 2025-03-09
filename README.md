# @poohou/resize-element

## 介绍
拖拽元素尺寸大小

![img](https://txt-01.oss-cn-chengdu.aliyuncs.com/typora/lyra/resize-element.gif)


## 使用方法
```html
<div id="resizeEl" style="width: 100px; height: 100px"></div>

<script>
    import { useResizeElement } from '@poohou/resize-element'

    useResizeElement('#resizeEl', {})
</script>
```
## 参数
```typescript
useResizeElement<HTMLElement | string, Options>
```

## Options

|  参数 | 默认值                                | 可选项/类型                                                                                        | 描述       |
|---|------------------------------------|-----------------------------------------------------------------------------------------------|----------|
|  position | ['top', 'right', 'bottom', 'left'] | `top-left`,`top-right`,`bottom-left`, `bottom-right`, `top`, `right`, `bottom`, `left`        | 可拖拽方向    |
|  isFixed | false                              | true                                                                                          | 是否固定位置   |
|  minWidth | 50                                 | number                                                                                        | 最小宽度     |
|  minHeight | 50                                 | number                                                                                        | 最小高度     |
|  showOnHover | false                              | boolean                                                                                        | 是否鼠标移入才显示拖拽点     |
|  edgeSize | 10                                 | number                                                                                        | 可拖拽区域大小  |
|  isImportant | true                               | false                                                                                         | 样式是否增加权重 |
|  onResize | -                                  | (event: { position: RESIZE_POSITION_ENUM, type: 'start' \| 'stop', el: HTMLElement }) => void | 事件       |


## Methods

| 方法名 | 参数 | 描述   |
|-----|----|------|
|   uninstall  | -  | 销毁 |


## GlobMethods

| 方法名 | 参数           | 描述         |
|-----|--------------|------------|
|   setGlobalOptions  | newOptions: Options | 设置全局默认参数方法 |
