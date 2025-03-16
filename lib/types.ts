// 可拖拽方向
export enum RESIZE_POSITION_ENUM {
  'TOP_LEFT' = 'top-left',
  'TOP_RIGHT' = 'top-right',
  'BOTTOM_LEFT' = 'bottom-left',
  'BOTTOM_RIGHT' = 'bottom-right',
  'TOP' = 'top',
  'BOTTOM' = 'bottom',
  'LEFT' = 'left',
  'RIGHT' = 'right'
}

// 拖拽选项
export interface IResizeElementOptions {
  /** 可拖拽方向，支持多个方向，默认包含 top、bottom、left、right */
  position?: Array<`${RESIZE_POSITION_ENUM}`>
  /** 是否固定元素位置，为 true 时拖动会调整元素的位置，默认 false */
  isFixed?: boolean
  /** 元素的最小宽度，拖动时不会小于此值，默认 50 */
  minWidth?: number
  /** 元素的最小高度，拖动时不会小于此值，默认 50 */
  minHeight?: number
  /** 拖拽事件的回调函数，返回拖拽的位置、类型（start/stop）和元素 */
  onResize?: (event: { position: RESIZE_POSITION_ENUM, type: 'start' | 'stop', el: HTMLElement }) => void
  /** 可拖拽区域的大小，默认 5px */
  edgeSize?: number
  /** 是否对样式增加权重（important），默认 true */
  isImportant?: boolean
  /** 是否仅在鼠标移入时显示拖拽点，默认 true */
  showOnHover?: boolean
  /** 是否展示拖拽样式，默认 true，false 则隐藏样式效果但仍可拖动 */
  showHandleStyle?: boolean
}
