
// 防抖 
export function _debounce(fn, delay) { var delay = delay || 200; var timer; return function () { var th = this; var args = arguments; if (timer) { clearTimeout(timer); } timer = setTimeout(function () { timer = null; fn.apply(th, args); }, delay); }; }
// 节流 
export function _throttle(fn, interval) { var last; var timer; var interval = interval || 200; return function () { var th = this; var args = arguments; var now = +new Date(); if (last && now - last < interval) { clearTimeout(timer); timer = setTimeout(function () { last = now; fn.apply(th, args); }, interval); } else { last = now; fn.apply(th, args); } } }

// 简单的拷贝对象
export function easyClone(data) {
  return JSON.parse(JSON.stringify(data));
}

/**
 * 浅层拷贝,将右侧对象上对应键的内容copy到左侧对象上  
 * 如果force为true(默认false),则只有当左侧和右侧同名的情况下左侧才会被覆盖
 * @param {Object} target 目标对象
 * @param {Object} source 数据源对象
 * @param {Boolean} force 强力模式
 * @returns {Object} 返回target
 */
export function easyAssign(target,source,force) {
  for (const key of Object.keys(source)) {
    force ? target[key] = source[key] : target[key] ? target[key] = source[key] : null;
  }
  return target;
}

/**
 * 将FileList转为,文件名称-文件对象的fromdata对象,
 * 如果传入一个File对象则返回一个名称为file对应值为file的fromdata对象.
 * @param {FileList|File} files 需要转换为formdata的对象
 */
export function makeFormData(files) {

  if(files instanceof FormData){
    return files;
  }

  const formData = new FormData();

  if(files instanceof File){
    formData.set('file',files);
    return formData;
  }

  for (const keyName of Object.keys(files)) {
    formData.set(files[keyName].name,files[keyName]);
  }

  return formData;

}

export function runningTime(unixTime){

  const result = [];

  const day = Math.floor(unixTime / 86400000);

  if(day > 0){
    result.push(`${day}天`);
    unixTime = unixTime - (day * 86400000);
  }

  const hour = Math.floor(unixTime / 3600000);

  if(hour > 0 ){
    result.push(`${hour}小时`);
    unixTime = unixTime - (hour * 3600000);
  }

  const minute = Math.floor(unixTime / 60000);

  if(minute > 0){
    result.push(`${minute}分钟`);
    unixTime = unixTime - (minute * 60000);
  }

  const second = Math.floor(unixTime / 1000);

  if (second > 0){
    result.push(`${second}秒`);
    unixTime = unixTime - (second * 60000);
  }

  return result.join('-');

}
