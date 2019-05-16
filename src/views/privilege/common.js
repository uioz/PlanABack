export const getIndexFromDataByAccount = (keyName)=>function(account){

  let len = this[keyName].length;

  while (len--) {
    if (this[keyName][len].account === account) {
      return len;
    }
  }

  return -1;

}