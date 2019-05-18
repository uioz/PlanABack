import { easyAssign } from "../utils/public";

const USER_DATA_NAME = 'userData';

/**
 * 获取本地保存的用户数据,
 * 不存在则返回null
 */
export const getUserData = ()=>{
  return localStorage.getItem(USER_DATA_NAME);
}

/**
 * 更新本地保存的用户数据
 * @param {object} newData 需要写入用户信息的数据
 */
export const updateUserData = (newData)=>{
  localStorage.setItem(USER_DATA_NAME, JSON.stringify(easyAssign(localStorage.getItem(USER_DATA_NAME) || {}, newData, true)));
}


/**
 * 清空本地保存的用户数据
 */
export const clearUserData = ()=>{
  localStorage.removeItem(USER_DATA_NAME);
}