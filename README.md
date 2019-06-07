# planaback

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### what the fxxking .env file doing?

没有使用 `vue-cli` 的情况下, 也就是纯使用 `webpack` 的情况下, 我们有多种方式向 `webpack.config.js` 中传递环境变量.

传递环境变量的目的无非两种:
- 将这些参数传递给 `webpack.config.js` 中的 `loader` 或者 `plugin` 或者影响 `webpack.config.js` 行为.
- 将这些参数传递给页面, 影响页面的行为.

`vue-cli` 在 `webpack` 之上进行了包装, 原生的 `webpack` 传入环境变量的方式被隐藏了, 但是 `vue-cli` 提供了另外一种手段.

一个由 `vue-cli` 服务构建的 `vue` 程序, 真正让这个程序运行起来的实际上是 `vue-serve` 这个包, 他在 `/node_modules/@vue/cli-service` 中存放.  
也是在 `package.json` 中 `vue-cli-service` 的命令的本体:
```json
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
  },
```

如果我们想要更改环境变量, 必须通过 `vue-cli-service` 服务来进行修改, 这里就涉及到了 `.env` 文件.

简单来说 `vue-cli-service` 有几个基本的运行模式, 最常使用的就是 `development` 和 `production` 这两个.

如果你在项目根目录中建立了对应以 `.env` 开头的文件:
```
.env.development
.env.production
```
这个文件就会在对应的模式下进行读取, 然后将文件内部的东西挂载到环境变量中.

默认的 `.env` 文件在两种模式下都起作用, 但是基于模式的配置文件的优先级高于默认的的 `.env` 文件中配置的环境变量.

实际上这还不符合常见的需求, 因为我们可能还会基于 **开发** 或者 **生产** 者两种情况来指定更加丰富的策略, 例如本项目中就需要在 `development` 模式下提供:
- 有 `mock` 数据的版本
- 无 `mock` 数据的版本用于连接实际的网站后台

这个时候我们可以基于 **开发** 或者 **生产** 这两个模型来修改这个模式名称然后定义自己的环境变量.

**注意**:原有的模式的特性依然会被保留.  
**注意**:默认就有的环境变量 `NODE_ENV` 还有 `BASE_URL` 无论在何种情况下都会存在也不会被配置文件覆盖, 除非你注入了 `webpack` 的配置.

例如我基于 `development` 创建一个 `dev-pure` 命令它基于原来的 `serve` 命令修改模式名称为 `unmock`, 这个模式对应的配置文件名称是 `.env.unmock` 文件内容如下:
```
VUE_APP_MOCK=false
```
而 `package.json` 中修改的命令如下:
```json
"scripts": {
    "serve": "vue-cli-service serve",
    "dev-pure":"vue-cli-service serve --mode unmock"
  },
```

运行 `serve` 的流程:
- 读取 `.env` 中的环境变量

运行 `dev-pure` 的流程:
- 被指定了一个模式 `unmock`
- 读取 `.env` 中的环境变量
- 读取 `.env.unmock` 中的环境变量
  - `.env` 中的环境变量被 `.env.unmock` 中的覆盖

另外需要注意的是配置文件中的环境变量默认只被添加到了编译时, 也就是在 `webpack` 运行的时候是可以访问的, 在项目中是无法访问的.  
只有使用 `VUE_APP_MOCK` 开头的变量才会被添加到运行中, 例如之前例子中的配置.


