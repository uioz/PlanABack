import AxiosInstance from "@/plugin/axios.js";
import { urls, routeExp, UrlRouterGenerator } from "./url.js";
import { makeFormData } from "../utils/public.js";
import Toast from "../plugin/musetoast.js";

export const urlRouter = UrlRouterGenerator(urls, routeExp);

/**
 * 默认拦截器组
 */
const intercepts = {
  request(data, vuexContext) {

  },
  response(data, response, vuexContext) {

    if (response.status >= 400) {
      throw '电波无法到达!✨';
    } else if (response.data && response.data.stateCode !== 200) {
      throw response.data.message;
    }

  },
  error(data, error, vuexContext) {

    if (error instanceof Error) {
      Toast.error('网络连接失败, 请检查你的网络!');
    } else {
      Toast.warning(error);
    }

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
const autoIntercept = (name, source, ...rest) => {
  const isFun = source[name];

  if (typeof isFun === 'function') {
    isFun(source, ...rest);
  } else if (isFun === undefined || isFun === true) {

    intercepts[name](source, ...rest);
  }
}

/**
 * 包装axios请求
 * @param {String} method 请求方法
 * @param {String} url 请求的地址
 * @param {Object} source 请求时候提供的配置
 * @param  {...any} rest 任意参数将交由拦截器
 */
const request = async (method, url, source, ...rest) => {

  try {
    if (source.request != false) {
      autoIntercept('request', source, ...rest);
    }
    const result = await AxiosInstance.request({
      url,
      method,
      params: method !== 'post' ? source.data : undefined,
      data: method === 'post' ? source.data : undefined,
      ...source.config
    });
    if (source.response != false) {
      autoIntercept('response', source, result, ...rest);
    }
    return result;
  } catch (error) {
    if (source.error != false) {
      autoIntercept('error', source, error, ...rest);
      return null;
    } else {
      throw error;
    }
  }
}

/**
 * 用于生成请求方法
 * @param  {...String} methods 方法名称
 */
const generatorRequestMethods = (...methods) => {
  const result = {};
  for (const method of methods) {
    result[method] = (vuexContext, source) => {
      // 优先使用 payload.url 
      return request(method, source.url || urlRouter(source.target), source, vuexContext);
    }
  }
  return result;
};

/**
 * 说明:
 * 添加的actions都支持传入一个payload(Object).  
 * 格式如下:
 * - data:object 请求的数据
 * - target:string 请求的目标
 * - config:object axios请求的配置
 * - request:function|boolean 请求拦截器
 * - response:function|boolean 响应拦截器
 * - error:function|boolean 错误拦截器
 * 
 * 拦截器定义:
 * request(source:object,vuex:object)  
 * response(source:object,response:object,vuex:object)  
 * error(source:object,error:Error,vuex:object)  
 * 
 * 方法响应:
 * get():Promise<undefined|object> // 如果拦截器代理了所有的处理则then返回undefined
 */
export default {
  ...generatorRequestMethods('get', 'post', 'delete'),
  getAsJson({ dispatch }, payload) {
    return dispatch('get', {
      ...payload,
      config: {
        headers: {
          'accept': 'application/json'
        },
      }
    });
  },
  postAsJson({ dispatch }, payload) {
    return dispatch('post', {
      ...payload,
      config: {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
    });
  },
  uploadForm({ dispatch }, payload) {
    const { data, ...rest } = payload;
    return dispatch('post', {
      data: makeFormData(data),
      config: {
        headers: {
          'content-type': 'multipart/form-data'
        },
      },
      ...rest
    });
  }
  // postAsForm({ dispatch }, payload) {
  //   const { data, ...rest } = payload;
  //   return dispatch('post', {
  //     data: Qs(humps.decamelizeKeys(data)),
  //     config: {
  //       headers: {
  //         'content-type': 'application/x-www-form-urlencoded'
  //       },
  //     },
  //     ...rest
  //   });
  // },
}