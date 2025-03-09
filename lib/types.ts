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
  // 可拖拽方向
  position?: Array<`${RESIZE_POSITION_ENUM}`>
  // 是否固定
  isFixed?: boolean
  // 最小宽度
  minWidth?: number
  // 最小高度
  minHeight?: number
  // 事件
  onResize?: (event: { position: RESIZE_POSITION_ENUM, type: 'start' | 'stop', el: HTMLElement }) => void
  // 可拖拽区域大小
  edgeSize?: number
  // 样式是否增加权重,默认
  isImportant?: boolean
  // 是否鼠标移入才显示拖拽点
  showOnHover?: boolean
}
