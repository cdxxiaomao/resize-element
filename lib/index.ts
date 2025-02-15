import { type IResizeElementOptions, RESIZE_POSITION_ENUM } from './types'

export function useResizeElement (el: HTMLElement, options?: IResizeElementOptions) {
  const resizeHandles = new Map<string, HTMLElement>()
  const defaultOptions: IResizeElementOptions = {
    position: [
      RESIZE_POSITION_ENUM.TOP,
      RESIZE_POSITION_ENUM.BOTTOM,
      RESIZE_POSITION_ENUM.RIGHT,
      RESIZE_POSITION_ENUM.LEFT
    ],
    isFixed: false,
    minWidth: 50,
    minHeight: 50,
    edgeSize: 10, // 可拖拽区域大小
    onResize: () => {}, // 拖拽回调函数
    isImportant: true
  }

  options = { ...defaultOptions, ...options }

  // 创建可拖拽区域的handle
  function createResizeHandle (position) {
    const handle = document.createElement('div')
    handle.classList.add('resize-handle')
    handle.classList.add(position)
    handle.style.position = 'absolute'
    handle.style.width = '5px'
    handle.style.height = '5px'
    handle.style.borderRadius = '10px'
    handle.style.zIndex = '100'
    handle.style.backgroundColor = 'rgba(129,129,129,0.2)'
    handle.style.cursor = getCursorForPosition(position)

    handle.addEventListener('mouseenter', () => {
      handle.style.backgroundColor = 'rgba(115,115,115,0.47)' // 可以设置为任何你想要的颜色
    })

    // 鼠标移出时恢复原来的颜色
    handle.addEventListener('mouseleave', () => {
      handle.style.backgroundColor = 'rgba(129,129,129,0.2)' // 恢复原来的颜色
    })

    // 根据position设置handle的初始位置
    switch (position) {
      case 'top-left':
        handle.style.top = '0'
        handle.style.left = '0'
        break
      case 'top-right':
        handle.style.top = '0'
        handle.style.right = '0'
        break
      case 'bottom-left':
        handle.style.bottom = '0'
        handle.style.left = '0'
        break
      case 'bottom-right':
        handle.style.bottom = '0'
        handle.style.right = '0'
        break
      case 'top':
        handle.style.top = '0'
        handle.style.left = '50%'
        handle.style.width = '20px'
        handle.style.transform = 'translateX(-50%)'
        break
      case 'bottom':
        handle.style.bottom = '0'
        handle.style.left = '50%'
        handle.style.width = '20px'
        handle.style.transform = 'translateX(-50%)'
        break
      case 'left':
        handle.style.top = '50%'
        handle.style.left = '0'
        handle.style.height = '20px'
        handle.style.transform = 'translateY(-50%)'
        break
      case 'right':
        handle.style.top = '50%'
        handle.style.right = '0'
        handle.style.height = '20px'
        handle.style.transform = 'translateY(-50%)'
        break
      default:
        break
    }

    // 拖动处理
    const resizeHandler = (e) => {
      e.preventDefault()
      const startX = e.clientX
      const startY = e.clientY

      const initialWidth = parseFloat(document.defaultView?.getComputedStyle(el)?.width ?? '0')
      const initialHeight = parseFloat(document.defaultView?.getComputedStyle(el)?.height ?? '0')
      const initialLeft = parseFloat(document.defaultView?.getComputedStyle(el)?.left ?? '0')
      const initialTop = parseFloat(document.defaultView?.getComputedStyle(el)?.top ?? '0')

      document.addEventListener('mousemove', resize)
      document.addEventListener('mouseup', stopResize)

      function capitalizeFirstLetter (str: string) {
        if (!str) return str // 处理空字符串情况
        return str.charAt(0).toUpperCase() + str.slice(1)
      }

      function getSize (size: number, direction: 'width' | 'height') {
        if (size < (options?.['min' + capitalizeFirstLetter(direction)] ?? 0)) {
          return options?.['min' + capitalizeFirstLetter(direction)] ?? size
        }
        return size
      }

      let transition

      function resize (e) {
        transition = document.defaultView?.getComputedStyle(el).transition
        el.style.transition = 'none'
        if (position.includes('right')) {
          el.style.setProperty('width', `${getSize(initialWidth + e.clientX - startX, 'width')}px`, options?.isImportant ? 'important' : undefined)
        }
        if (position.includes('bottom')) {
          el.style.setProperty('height', `${getSize(initialHeight + e.clientY - startY, 'height')}px`, options?.isImportant ? 'important' : undefined)
        }
        if (position.includes('left')) {
          const width = getSize(initialWidth - (e.clientX - startX), 'width')

          el.style.setProperty('width', `${width}px`, options?.isImportant ? 'important' : undefined)

          if (options?.isFixed) {
            const left = initialLeft - (width - initialWidth)
            el.style.setProperty('left', `${left < 0 ? 0 : left}px`, options?.isImportant ? 'important' : undefined)
          }
        }
        if (position.includes('top')) {
          const height = getSize(initialHeight - (e.clientY - startY), 'height')

          el.style.setProperty('height', `${height}px`, options?.isImportant ? 'important' : undefined)

          if (options?.isFixed) {
            const top = initialTop - (height - initialHeight)
            el.style.setProperty('top', `${top < 0 ? 0 : top}px`, options?.isImportant ? 'important' : undefined)
          }
        }
        options?.onResize?.({ position, el, type: 'start' })
      }

      function stopResize () {
        el.style.transition = transition

        options?.onResize?.({ position, el, type: 'stop' })

        document.removeEventListener('mousemove', resize)
        document.removeEventListener('mouseup', stopResize)
      }
    }

    handle.addEventListener('mousedown', resizeHandler)
    return handle
  }

  // 创建拖拽点的handle
  function createEdgeHandles () {
    (options?.position ?? []).forEach((position) => {
      const handle = createResizeHandle(position)
      resizeHandles.set(position, handle)
      el.appendChild(handle)
    })
  }

  // 初始化
  function init () {
    if (resizeHandles.size > 0) {
      return
    }
    if (el && (getComputedStyle(el).position === 'static' || !getComputedStyle(el).position)) {
      el.style.position = 'relative'
    }

    createEdgeHandles()
  }

  // 根据position获取光标值
  function getCursorForPosition (position) {
    switch (position) {
      case 'top-left':
      case 'bottom-right':
        return 'nwse-resize'
      case 'top-right':
      case 'bottom-left':
        return 'nesw-resize'
      case 'top':
      case 'bottom':
        return 'ns-resize'
      case 'left':
      case 'right':
        return 'ew-resize'
      default:
        return 'auto'
    }
  }

  // 卸载方法
  function uninstall () {
    resizeHandles.forEach((handle) => {
      handle.remove()
    })

    resizeHandles.clear()
  }

  // 初始化
  init()

  // 返回卸载方法
  return {
    init,
    uninstall
  }
}
