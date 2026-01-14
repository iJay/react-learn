export function isNumber (obj: unknown): obj is number { // obj is number → 类型谓词，用于 类型保护
  // obj is number 功能：让 TypeScript 静态类型知道 这个函数返回 true 时，obj 的类型就是 number
  return Object.prototype.toString.call(obj) === '[object Number]' && obj === obj // 这里需要排除NaN的情况
}

export function mergeNumberVal (value?: string | number, defaultVal?: number) {
  if (value === undefined) {
    return defaultVal
  }
  if (isNumber(value)) {
    return value
  }
  // 下面的逻辑因为obj is number会缩窄类型， 所以TS默认下面的value是string | undefined
  const valToNumber = parseFloat(value)
  return isNumber(valToNumber) ? valToNumber : defaultVal
}