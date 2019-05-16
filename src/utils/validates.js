
/**
 * 用于正确的获取字符串的长度,兼容到ES5
 * see https://segmentfault.com/q/1010000012870121
 * @param {String} text 要获取长度的字符串
 * @returns {Number} 返回字符串的长度
 */
export function getStringLength(text) {

  if (typeof text != 'string') {
    throw new TypeError('text must be string');
  }

  try {
    // 如果字符串是空串match返回null没有length属性会报错
    // 这也意味着长度是0
    return text.match(/(?:[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g).length;
  } catch (error) {
    return 0;
  }

}

/**
 * 是否填写了内容
 * @param {String} value 字符串
 */
export const required = str=>!!str;

/**
 * 判断给定的字符串中没有任何空白字符
 * @param {String} str 字符串
 */
export const noSpace = str => /^\S*$/.test(str);

/**
 * 给定的字符串中只含有中英文以及下划线
 * see https://blog.csdn.net/archer119/article/details/52202065
 * see https://www.qqxiuzi.cn/zh/hanzi-unicode-bianma.php
 * see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions
 * @param {String} str 字符串
 */
export const CnEnAndUndeline = str => /^[\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\w]*$/.test(str);

/**
 * 给定的字符串需要以字母开头且只能含有字母数字下划线
 * **注意**:当传入空串的时候返回true
 * @param {String} str 字符串
 */
export const password = str => str ? /^[a-zA-Z]\w*$/.test(str):true;

/**
 * 判断给定的字符串是否在指定的区间中(给定的区间也被包含在内)
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 */
export const range = (min = 1, max = 16) => (str) => {
  if(str){
    const len = getStringLength(str);
    return len >= min && len <= max;
  }
  return true;  
}

/**
 * 验证给定的字符串输入的字符串是否合法,支持多行输入.  
 * 运行输入中英文常见的标点符号.  
 * @param {String} str 字符串
 */
export const mulitRowText = str => /^[\u4E00-\u9FA5\w\n\r@,\.!\[\]\+\-\(\)，。！‘’“”{}'"　 ]*$/.test(str);