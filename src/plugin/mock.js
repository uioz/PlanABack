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

mock('/model',{
  '信息工程系':{
    '计算机应用技术':['这个技术','哪个技术'],
    'deepdark':{
      'hello':['world','C++'],
      'deepdark':['fantasy']
    }
  },
  '新的系':{
    'java':{
      'android':{
        'sqllite':['3.0','4.0','5.0']
      }
    },
    'node':{
      'express':['egg','koa','xxx.js']
    }
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": ['7', '8', '9'],
    "@vue/cli-plugin-eslint": ['4', '5', '6'],
    "@vue/cli-service": ['1', '2', '3']
  }
});