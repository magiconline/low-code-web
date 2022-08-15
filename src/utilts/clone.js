// 深拷贝js对象
// 函数会被忽略，循环引用会出错
export function deepCopy(v) {
    return JSON.parse(JSON.stringify(v))
}