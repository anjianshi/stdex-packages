/** 判断当前处于浏览器还是 Node.js 环境中 */
export function isBrowser() {
  return typeof window !== 'undefined' && typeof window.document !== 'undefined'
}

/** 判断值是否是 Promise */
export function isPromiseLike<T = unknown>(value: unknown): value is PromiseLike<T> {
  if (value === null || (typeof value !== 'object' && typeof value !== 'function')) {
    return false
  }
  try {
    return typeof (value as { then?: unknown }).then === 'function'
  } catch {
    return false // Proxy 或 then getter 可能抛异常
  }
}
