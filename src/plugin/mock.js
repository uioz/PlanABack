import { mock, setup, Random } from "mockjs";

setup({
  timeout: '200-600' // see https://github.com/nuysoft/Mock/wiki/Mock.setup()
});

Random.extend({
  ISODateStr() {
    return new Date(Random.datetime()).toJSON();
  }
});

mock('/login', {
  nickName: '@csentence(2,10)',
  level: '@integer(1, 68)',
  levelCodeRaw: '@string("number", 1, 3)',
  'controlArea|1-10': ['@word']
});

mock('/api/server/base', {
  notice: '@cparagraph',
  appname: '@csentence(2,10)',
  brand: '@url',
  logo: '@url',
  bg: '@url',
  pubilc: '/public'
});
// TODO add info about system and school name

mock('/api/state', {
  nickName: '@csentence(2,10)',
  lastLoginTime: '@ISODateStr',
  startTime: '@ISODateStr',
  endTime: '@ISODateStr',
  'runingTime|1000-10000000000': 0,
});

mock('/model', {
  '信息工程系': {
    '计算机应用技术': ['这个技术', '哪个技术'],
    'deepdark': {
      'hello': ['world', 'C++'],
      'deepdark': ['fantasy']
    }
  },
  '新的系': {
    'java': {
      'android': {
        'sqllite': ['3.0', '4.0', '5.0']
      }
    },
    'node': {
      'express': ['egg', 'koa', 'xxx.js']
    }
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": ['7', '8', '9'],
    "@vue/cli-plugin-eslint": ['4', '5', '6'],
    "@vue/cli-service": ['1', '2', '3']
  }
});

mock('/assest/speciality', [
  {
    "name": "信息工程系",
    "title": "你好",
    "notice": "hello",
    "lists": [
      {
        "name": "计算机技术",
        "title": "吗",
        "notice": "",
        "lists": [
          {
            "name": "计算机应用技术",
            "title": "我",
            "notice": "",
            "lists": [

            ]
          },
          {
            "name": "移动应用开发",
            "title": "知道",
            "notice": "",
            "lists": [

            ]
          }
        ]
      },
      {
        "name": "环境艺术设计",
        "title": "你",
        "notice": "",
        "lists": [
          {
            "name": "室内设计",
            "title": "在那里",
            "notice": "",
            "lists": [

            ]
          }
        ]
      },
      {
        "name": "动漫制作",
        "title": "",
        "notice": "",
        "lists": [
          {
            "name": "数字雕刻技术",
            "title": "",
            "notice": "",
            "lists": [

            ]
          }
        ]
      }
    ]
  }
]);

mock('/api/specalties/2019', {
  stateCode: 200,
  "message|5-10": [
    "@word",
    "CMD",
    "UMD"
  ]
});