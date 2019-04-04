import { mock,setup,Random } from "mockjs";

setup({
  timeout: '200-600' // see https://github.com/nuysoft/Mock/wiki/Mock.setup()
});

Random.extend({
  ISODateStr() {
    return new Date(Random.datetime()).toJSON();
  }
});

mock('/api/server/base', {
  notice:'@cparagraph',
  appname:'@csentence(2,10)',
  brand:'@url',
  logo:'@url',
  bg:'@url',
  pubilc:'/public'
});

mock('/api/state',{
  nickName:'@csentence(2,10)',
  lastLoginTime:'@ISODateStr',
  startTime:'@ISODateStr',
  endTime:'@ISODateStr',
  'runingTime|1000-10000000000':0,
});