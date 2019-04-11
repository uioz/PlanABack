export const urls = {
  login: '/login',
  logout:'/logout',
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
 * @param {String} urlRoute 传入的路径
 * @param {RegExp} routeRule 用于判断是否符合模块路径定义的正则
 */
export const urlRouter = (urlRoute, routeRule) => {

  return (path) => {

    if (!routeRule.test(path)) {
      return path;
    }

    const
      paths = path.split('/'),
      len = paths.length;

    let
      i = 0, result = urlRoute;

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
}

/**
 * 根据传入的url路由和匹配规则生成一个模块地址路由器
 * @param {Object} urlRoute url路由
 * @param {RegExp} routeRule 路由匹配规则
 */
export const UrlRouterGenerator = (urlRoute,routeRule)=>urlRouter(urlRoute,routeRule);