/**
 * 本文件导出一些公用的功能,针对于Vue组件,并非普通的js.
 * 
 * 每一个导出的对象都含有某种特殊限制下的功能.  
 * 
 * 意图在于使用mixins来实现interface的基本概念.
 */


/**
 * # 接口描述:  
 * 根据路由中填写的激活下标,赋值到内部的状态中,用于含有切换功能多页面进入后  
 * 切换组件的高亮.  
 * 当路由地址改变后内部的切换组件的激活状态会随之改变.  
 * # 接口需求
 * - 使用vueRouter,使用beforeRouteEnter钩子
 * - 该接口会获取路由守卫中的meta.activeTabName键,如果不存在则不会修改内部状态
 * - data添加了一个activeTab字段
 */
export const autoTabIndex = {
  data(){
    return {
      activeTab:''
    }
  },
  beforeRouteEnter(to,from,next){

    const result = to.meta.activeTabName || false;

    if(result){
      next(vm=>vm.activeTab = result);
    }else{
      next(true);
    }

  }
}