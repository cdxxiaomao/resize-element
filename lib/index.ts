import { type IResizeElementOptions, RESIZE_POSITION_ENUM } from './types'

// 全局配置对象
const globalOptions: IResizeElementOptions = {
  minWidth: 50,
  minHeight: 50,
  edgeSize: 5, // 可拖拽区域大小
  showOnHover: true // 默认全局配置
}

export function useResizeElement (el: HTMLElement | string, options?: IResizeElementOptions) {
  const resizeEl = getEl(el)
  const resizeHandles = new Map<string, HTMLElement>()
  const defaultOptions: IResizeElementOptions = {
    position: [
      RESIZE_POSITION_ENUM.TOP,
      RESIZE_POSITION_ENUM.BOTTOM,
      RESIZE_POSITION_ENUM.RIGHT,
      RESIZE_POSITION_ENUM.LEFT
    ],
    isFixed: false,
    minWidth: globalOptions.minWidth,
    minHeight: globalOptions.minHeight,
    edgeSize: globalOptions.edgeSize, // 可拖拽区域大小
    onResize: () => {}, // 拖拽回调函数
    isImportant: true,
    showOnHover: globalOptions.showOnHover // 使用全局配置
  }

  options = { ...defaultOptions, ...options }

  // 判读是否为HTMLElement
  function isHTMLElement (obj: any): obj is HTMLElement {
    return obj && typeof obj.tagName === 'string'
  }

  function getElementByIdString (idString: string): HTMLElement | null {
    if (idString.startsWith('#')) {
      idString = idString.slice(1) // 去掉开头的 '#'
    }
    return document.getElementById(idString)
  }

  // 获取节点
  function getEl (el: HTMLElement | string): HTMLElement {
    if (isHTMLElement(el)) {
      return el
    }

    const element = getElementByIdString(el)
    if (element) {
      return element
    }
  }

  // 创建可拖拽区域的handle
  function createResizeHandle (position) {
    const handle = document.createElement('div')
    handle.classList.add('resize-handle')
    handle.classList.add(position)
    handle.style.position = 'absolute'
    handle.style.width = `${options?.edgeSize ?? globalOptions.edgeSize}px`
    handle.style.height = `${options?.edgeSize ?? globalOptions.edgeSize}px`
    handle.style.borderRadius = '10px'
    handle.style.zIndex = '100'
    handle.style.backgroundColor = 'rgba(129,129,129,0.2)'
    handle.style.cursor = getCursorForPosition(position)
    handle.style.display = 'none'

    handle.addEventListener('mouseenter', () => {
      handle.style.backgroundColor = 'rgba(115,115,115,0.47)'
    })

    handle.addEventListener('mouseleave', () => {
      handle.style.backgroundColor = 'rgba(129,129,129,0.2)'
    })

    switch (position) {
      case 'top-left':
        handle.style.top = '0'
        handle.style.left = '0'
        handle.style.width = '10px'
        handle.style.height = '10px'
        break
      case 'top-right':
        handle.style.top = '0'
        handle.style.right = '0'
        handle.style.width = '10px'
        handle.style.height = '10px'
        break
      case 'bottom-left':
        handle.style.bottom = '0'
        handle.style.left = '0'
        handle.style.width = '10px'
        handle.style.height = '10px'
        break
      case 'bottom-right':
        handle.style.bottom = '0'
        handle.style.right = '0'
        handle.style.width = '10px'
        handle.style.height = '10px'
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

      const initialWidth = parseFloat(document.defaultView?.getComputedStyle(resizeEl)?.width ?? '0')
      const initialHeight = parseFloat(document.defaultView?.getComputedStyle(resizeEl)?.height ?? '0')
      const initialLeft = parseFloat(document.defaultView?.getComputedStyle(resizeEl)?.left ?? '0')
      const initialTop = parseFloat(document.defaultView?.getComputedStyle(resizeEl)?.top ?? '0')

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
        transition = document.defaultView?.getComputedStyle(resizeEl).transition
        resizeEl.style.transition = 'none'
        if (position.includes('right')) {
          resizeEl.style.setProperty('width', `${getSize(initialWidth + e.clientX - startX, 'width')}px`, options?.isImportant ? 'important' : undefined)
        }
        if (position.includes('bottom')) {
          resizeEl.style.setProperty('height', `${getSize(initialHeight + e.clientY - startY, 'height')}px`, options?.isImportant ? 'important' : undefined)
        }
        if (position.includes('left')) {
          const width = getSize(initialWidth - (e.clientX - startX), 'width')

          resizeEl.style.setProperty('width', `${width}px`, options?.isImportant ? 'important' : undefined)

          if (options?.isFixed) {
            const left = initialLeft - (width - initialWidth)
            resizeEl.style.setProperty('left', `${left < 0 ? 0 : left}px`, options?.isImportant ? 'important' : undefined)
          }
        }
        if (position.includes('top')) {
          const height = getSize(initialHeight - (e.clientY - startY), 'height')

          resizeEl.style.setProperty('height', `${height}px`, options?.isImportant ? 'important' : undefined)

          if (options?.isFixed) {
            const top = initialTop - (height - initialHeight)
            resizeEl.style.setProperty('top', `${top < 0 ? 0 : top}px`, options?.isImportant ? 'important' : undefined)
          }
        }
        options?.onResize?.({ position, el: resizeEl, type: 'start' })
      }

      function stopResize () {
        resizeEl.style.transition = transition

        options?.onResize?.({ position, el: resizeEl, type: 'stop' })

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
      resizeEl.appendChild(handle)
    })
  }

  // 初始化
  function init () {
    if (resizeHandles.size > 0) {
      return
    }
    if (el && (getComputedStyle(resizeEl).position === 'static' || !getComputedStyle(resizeEl).position)) {
      resizeEl.style.position = 'relative'
    }

    createEdgeHandles()

    // 如果 showOnHover 为 false，默认显示拖拽点
    if (!options?.showOnHover) {
      resizeHandles.forEach(handle => {
        handle.style.display = 'block'
      })
    } else {
      // 添加鼠标移入移出事件监听，仅在 showOnHover 为 true 时生效
      resizeEl.addEventListener('mouseenter', () => {
        resizeHandles.forEach(handle => {
          handle.style.display = 'block'
        })
      })

      resizeEl.addEventListener('mouseleave', () => {
        resizeHandles.forEach(handle => {
          handle.style.display = 'none'
        })
      })
    }
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

// 全局设置方法
export function setGlobalOptions (newOptions: Partial<IResizeElementOptions>) {
  Object.assign(globalOptions, newOptions)
}
