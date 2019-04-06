export const urls = {
  login: '/login',
  base: '/api/server/base',
  state:'/api/state'
}

/**
 * 用于匹配符合模块地址的正则表达式对象
 * @example 允许通过的类型
 * routeExp.test('a') // true
 * routeExp.test('a/z') // true
 * routeExp.test('aa/zz') // true
 * routeExp.test('aa/zz/cc') // true
 */
export const routeExp = new RegExp(/^[a-z|A-Z]+(\/[a-z|A-Z]+)*$/);

/**
 * 根据传入的url来从url路由中寻找与其对应的地址
 * **注意**:不以'/'开头将视为绝对地址直接返回
 * @example
 * urlRouter('login/register') // => '/login/register'
 * urlRouter('login') // => '/login'
 * urlRouter('https://www.baidu.com') // => 'https://www.baidu.com'
 * urlRouter('/root/path') // => '/root/path'
 * @param {String} path 传入的路径
 * @param {RegExp} routeExp 用于判断是否符合模块路径定义的正则
 */
export const urlRouter = ((urls, routeExp) => {

  return (path) => {

    if (!routeExp.test(path)) {
      return path;
    }

    const
      paths = path.split('/'),
      len = paths.length;

    let
      i = 0, result = urls;

    while (i < len) {
      result = result[paths[i]];
      i++;
    }

    if(typeof result === 'string'){
      return result;
    }else if (result === undefined){
      throw new Error('Url is undefined');
    }else{
      return result['default']
    }

  }
})(urls, routeExp);

// TODO 修改为生成器接受一个url列表和一个正则