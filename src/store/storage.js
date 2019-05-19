import { easyAssign } from "../utils/public";

const 
  USER_DATA_NAME = 'userData',
  BASE_INFO_NAME = 'baseInfo';

class LocalStoreHelper {
  /**
   * 用于简单包装session和local的工具类,
   * 消除localStroage和sessionStorage之间
   * 的某些差异.
   * @param {String} type 存储类型 'local' | 'session'
   * @param {String} itemName 存储名称
   */
  constructor(type,itemName){
    this.storeType = type +'Storage';
    this.itemName = itemName;
  }

  /**
   * 获取数据
   */
  get(){
    return window[this.storeType].getItem(this.itemName);
  }

  /**
   * 更新数据
   * @param {any} newData 用于更新数据
   */
  update(newData){
    return window[this.storeType].setItem(this.itemName, JSON.stringify(easyAssign(localStorage.getItem(this.itemName) || {}, newData, true)));
  }

  /**
   * 清空所有的数据
   */
  clear(){
    return window[this.storeType].removeItem(USER_DATA_NAME);
  }

}

/**
 * 用户基本信息,长期有效
 */
export const userData = new LocalStoreHelper('local',USER_DATA_NAME);

/**
 * 服务器公开信息,会话期间有效
 */
export const baseInfo = new LocalStoreHelper('session',BASE_INFO_NAME);
