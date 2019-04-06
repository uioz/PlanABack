import Axios from "axios";
import { urlRouter } from "./url.js";

const instance = Axios.create();

/**
 * 默认拦截器组
 */
const intercepts = {
  request(data,vuexContext){
    console.log(data);
  },
  response(data, response, vuexContext){
    console.log(data,response);
  },
  error(data, error, vuexContext){
    console.log(data,error);
  }
}

/**
 * 自动触发对应类型的拦截器,
 * 当用户提供了拦截器(function)则优先使用用户提供的拦截器.  
 * 如果为指定拦截器或者传入true则使用默认的拦截器.  
 * 传入不符合以上规则的值会被忽略.
 * @param {String} name 要拦截的名称
 * @param {Object} source 用户请求的源数据
 * @param  {...any} rest 任意参数将传递给拦截器
 */
const autoIntercept = (name,source,...rest) => {
  const data = source.data;
  if (typeof data[name] === 'function') {
    data[name](data, ...rest);
  } else if (data[name] === true || data[name] === undefined){
    intercepts[name](data,...rest);
  }
}

/**
 * 包装axios请求
 * @param {String} method 请求方法
 * @param {String} url 请求的地址
 * @param {Object} source 请求时候提供的配置
 * @param  {...any} rest 任意参数将交由拦截器
 */
const request = (method, url, source, ...rest)=>{

  try {
    autoIntercept('request', source, ...rest);
    // TODO error
    const result = await instance.request({
      url,
      method,
      params: method === 'get' ? source.data : undefined,
      data: method === 'post' ? source.data : undefined,
      ...source.config
    });
    autoIntercept('response', source, result, ...rest);
    return result;
  } catch (error) {
    autoIntercept('error', source, error, ...rest);
  }
}

/**
 * source
 * - data 请求的数据
 * - target 请求的目标
 * - config axios 请求配置
 * - request 请求拦截器
 * - response 响应拦截器
 * - error 错误拦截器
 */

const generatorRequestMethods = (...methods)=>{
  const result = {};
  for (const method of methods) {
    result[method] = async function (vuexContext,source) {
      request(method,urlRouter(source.target),source,vuexContext);
    }
  }
};

export default {
  ...generatorRequestMethods('get','post')
}
