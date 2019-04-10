import { mock,setup,Random } from "mockjs";

setup({
  timeout: '200-600' // see https://github.com/nuysoft/Mock/wiki/Mock.setup()
});

Random.extend({
  ISODateStr() {
    return new Date(Random.datetime()).toJSON();
  }
});

mock('/login',{
  nickName:'@csentence(2,10)',
  level:'@integer(1, 68)',
  levelCodeRaw:'@string("number", 1, 3)',
  'controlArea|1-10': ['@word']
});

mock('/api/server/base', {
  notice:'@cparagraph',
  appname:'@csentence(2,10)',
  brand:'@url',
  logo:'@url',
  bg:'@url',
  pubilc:'/public'
});
// TODO add info about system and school name

mock('/api/state',{
  nickName:'@csentence(2,10)',
  lastLoginTime:'@ISODateStr',
  startTime:'@ISODateStr',
  endTime:'@ISODateStr',
  'runingTime|1000-10000000000':0,
});