import { mock, setup, Random } from "mockjs";
import pathToRegexp from "path-to-regexp";

setup({
  timeout: '200-600' // see https://github.com/nuysoft/Mock/wiki/Mock.setup()
});

Random.extend({
  ISODateStr() {
    return new Date(Random.datetime()).toJSON();
  }
});

mock('/login', {
  stateCode: 200,
  message: '',
  data: {
    nickName: '@csentence(2,10)',
    level: '@integer(1, 68)',
    levelCodeRaw: '@string("number", 1, 3)',
    'controlArea|1-10': ['@word']
  }
});

mock('/logout',{
  stateCode:200,
  message:'登出成功'
})


// TODO add info about system and school name

mock('/api/state', {
  stateCode: 200,
  message: '',
  data: {
    nickName: '@csentence(2,10)',
    'lastLoginTime|1000-10000000000': 0,
    'startTime|1000-10000000000': 0,
    'endTime|1000-10000000000': 0,
    'runingTime|1000-10000000000': 0,
  }
});

mock('/model', {
  stateCode: 200,
  message: '',
  data: {
    "信息工程系": {
      "计算机技术": ["计算机应用技术", "移动应用开发"],
      "环境艺术设计": ["室内设计"]
    },
    "艺术系": ["动漫制作"]
  }
});
// mock('/model', {
//   stateCode: 200,
//   message: '',
//   data: {
//     '信息工程系': {
//       '计算机应用技术': ['这个技术', '哪个技术'],
//       'deepdark': {
//         'hello': ['world', 'C++'],
//         'deepdark': ['fantasy']
//       }
//     },
//     '新的系': {
//       'java': {
//         'android': {
//           'sqllite': ['3.0', '4.0', '5.0']
//         }
//       },
//       'node': {
//         'express': ['egg', 'koa', 'xxx.js']
//       }
//     },
//     "devDependencies": {
//       "@vue/cli-plugin-babel": ['7', '8', '9'],
//       "@vue/cli-plugin-eslint": ['4', '5', '6'],
//       "@vue/cli-service": ['1', '2', '3']
//     }
//   }
// });

mock('/assest/speciality', {
  stateCode: 200,
  message: '',
  data: [
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
  ]
});


/**
 * query :{
 *  year:undefined // 获取的是专业结构上的可以使用的专业
 *  year:number // 获取的是该年份数据的可以使用的专业
 * }
 */
mock('/api/specalties', {
  stateCode: 200,
  message: '',
  "data|5-10": ["@word"]
});

mock(pathToRegexp('/source/json/:year/:start/to/:end'), 'get', {
  stateCode: 200,
  message: '',
  "data|20": [
    {
      "name": "你好吗",
      "number": 12435658679,
      "speciality": "计算机类",
      "ss": "hello区域",
      "score": 372.097045053,
      "specialityPath": []
    }
  ]
});

mock('/api/open/force', {
  stateCode: 200,
  message: '',
  data: '@boolean'
})

mock('/api/open/range', {
  stateCode: 200,
  message: '',
  data: {
    startTime: '@natural(1000000000000,1999999999999)',
    endTime: '@natural(1000000000000,1999999999999)'
  }
});

mock('/api/open/open','get', {
  stateCode: 200,
  message: '',
  data: '@boolean'
});
mock('/api/open','post', {
  stateCode: 200,
  message: '',
  data: '@boolean'
});


mock('/api/assets', 'get', {
  stateCode: 200,
  message: '',
  data: {
    systemName: '@word',
    clientName: '@word',
    systemMessage: '@word',
    clientMessage: '@word',
    systemBackground: Random.image('200x100', '#4A7BF7', 'Hello'),
    clientBackground: Random.image('200x100', '#4A7BF7', 'Hello'),
    logo: Random.image('200x100', '#4A7BF7', 'Hello')
  }
});

mock('/api/assets', 'post', {
  stateCode: 200,
  message: '数据上传成功'
});

mock(pathToRegexp('/api/assets/app/image/:type'), 'post', {
  stateCode: 200,
  message: '修改成功',
});

mock('/api/assets/static/photos', 'get', {
  stateCode: 200,
  message: '',
  'data|5-10': [
    {
      id: '@guid',
      src: Random.image('200x100', '#4A7BF7', 'Hello'),
      fileName: '@word'
    }
  ]
})

mock('/api/assets/static/photos', 'post', {
  stateCode: 200,
  message: '上传文件成功',
  'data|5-10': [
    {
      id: '@guid',
      src: Random.image('200x100', '#4A7BF7', 'Hello'),
      fileName: '@word'
    }
  ]
});


// It will not pass to this pattern
// when url has query string
// in order to use regexp
mock(/^\/api\/assets\/static\/photos/, 'delete', {
  stateCode: 200,
  message: '删除成功',
});


// findAll
mock('/api/users', 'get', {
  stateCode: 200,
  message: '',
  'data|1-20': [
    {
      userid:'@guid',
      account: '@word',
      nickname: '@word',
      level: '@integer(0,63)',
      'controlarea|0-5': ['@word']
    }
  ]
});

// updateOne by JSON
mock(pathToRegexp('/api/users'), 'post', {
  stateCode: 200,
  message: '修改成功',
});

// deleteOne
mock(pathToRegexp('/api/users/:userid'), 'delete', {
  stateCode: 200,
  message: '删除成功',
});
