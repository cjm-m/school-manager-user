# school-manager-user

> school-manager-user这是一个极简的 vue admin 管理后台。它只包含了 Element UI & axios & iconfont & permission control & lint，这些搭建后台必要的东西。

目前版本为 `v4.0+` 基于 `vue-cli` 进行构建，若你想使用旧版本，可以切换分支到[tag/3.11.0](https://github.com/PanJiaChen/vue-admin-template/tree/tag/3.11.0)，它不依赖 `vue-cli`。

如果你想要根据用户角色来动态生成侧边栏和 router，你可以使用该分支[permission-control](https://github.com/PanJiaChen/vue-admin-template/tree/permission-control)

##以下是后台管理的操作

```bash
# 克隆项目
git clone https://gitee.com/boooom/school-manager-admin

# 进入项目目录
cd school-manager-admin

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

[function]!
(https://github.com/cjm-m/school-manager-user/screenshots/function.png)

[Interface]!(https://github.com/cjm-m/school-manager-user/screenshots/Interface.png)

浏览器访问 [http://localhost:9528](http://localhost:9528)

- 删除多余界面 router/index
- 删除后的界面如下

```bash
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
```

#安装ES6语法插件
```bash
npm install --save es6-promise
```

使用老师写的的Axios 插件

http.js存放位置
 
[Axios]!(https://github.com/cjm-m/school-manager-user/screenshots/Axios.png)

http.js ↓

```bash
import Vue from 'vue';
import Axios from 'axios';
import {Promise} from 'es6-promise';

import {MessageBox, Message} from 'element-ui'

Axios.defaults.timeout = 30000; // 1分钟
Axios.defaults.baseURL = '';

Axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  //change method for get
  /*if(process.env.NODE_ENV == 'development'){
      config['method'] = 'GET';
      console.log(config)
  }*/
  if (config['MSG']) {
    // Vue.prototype.$showLoading(config['MSG']);
  } else {
    // Vue.prototype.$showLoading();
  }
  // if(user.state.token){//用户登录时每次请求将token放入请求头中
  //   config.headers["token"] = user.state.token;
  // }

  if (config['Content-Type'] === 'application/x-www-form-urlencoded;') {//默认发application/json请求，如果application/x-www-form-urlencoded;需要使用transformRequest对参数进行处理
    /*config['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';*/
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    config['transformRequest'] = function (obj) {
      var str = [];
      for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      return str.join("&")
    };
  }
  //config.header['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

  return config;
}, function (error) {
  // Do something with request error
  // Vue.$vux.loading.hide()
  return Promise.reject(error);
});

Axios.interceptors.response.use(
  response => {
    // Vue.$vux.loading.hide();
    return response.data;
  },
  error => {
    // Vue.$vux.loading.hide();
    if (error.response) {
      switch (error.response.status) {
        case 404:
          Message({
            message: '' || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
          break;
        default:
          Message({
            message: '' || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
      }
    } else if (error instanceof Error) {
      console.error(error);
    } else {
      Message({
        message: '' || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    }

    return Promise.reject(error.response);
  });

export default Vue.prototype.$http = Axios;
```

配置axios代理：

[agent]!(https://github.com/cjm-m/school-manager-user/screenshots/agent.png)

```bash
'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      },
      ['/api']: {
        target: `http://127.0.0.1:3000`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + '/api']: ''
        }
      }
    },
    after: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
    // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}

```

main.js中加入http

```bash
import http from './utils/http'
Vue.use(http)
```

[index]!(https://github.com/cjm-m/school-manager-user/screenshots/index.png)

index.vue ↓

```bash
<template>
  <div class="dashboard-container">
    欢迎
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    mounted(){
      this.$http.get('/api/users/add').then(res => {
        console.log('this.panels', res)
      })
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>

```

#全局安装koa-generator,执行下面命令

```bash
npm install -g koa-generator

```

#构建koa2项目代码如下

```bash 
koa2 projectName
```

构建成功信息：

```bash
D:\project>koa2 projectName

   create : projectName
   create : projectName/package.json
   create : projectName/app.js
   create : projectName/public
   create : projectName/public/images
   create : projectName/routes
   create : projectName/routes/index.js
   create : projectName/routes/users.js
   create : projectName/views
   create : projectName/views/index.pug
   create : projectName/views/layout.pug
   create : projectName/views/error.pug
   create : projectName/public/stylesheets
   create : projectName/public/stylesheets/style.css
   create : projectName/bin
   create : projectName/bin/www

   install dependencies:
     > cd projectName && npm install

   run the app:
     > SET DEBUG=koa* & npm start projectName

   create : projectName/public/javascripts

D:\project>

```
初始化后台项目插件，命令如下:

```bash
cd projectName

```

初始化项目，如果没有安装git会报错

```bash
npm install
```

项目试运行

```bash
npm run dev
```

这里koa2模板提示信息做的并不好，没有输出测试地址，成功后出现如下界面代表成功了。

```bash
D:\project\projectName>npm run dev

> projectName@0.1.0 dev D:\project\projectName
> nodemon bin/www

[nodemon] 1.19.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node bin/www`
```

在浏览器打开地址：

http://localhost:3000/

出现koa2的欢迎界面就代表成功了。

##安装本地mongodb或者在mongodb官网新建免费的云端服务器。

>本人在这里用的mongodb免费云端数据库。
抱歉密码不能公开，请自行换成自己的密码
链接如下：

###本人数据库名为test

```bash
mongodb+srv://xxwozixin:<password>@cluster0-7d5kk.mongodb.net/test?retryWrites=true&w=majority

```

###安装mongoose

```bash
npm install mongoose --save
```

###在建好的nodejs项目中根目录创建db目录
- 作者用的webstorm,可以根据自己需要下载编辑器

###下面代码中连接密码需要修改成自己的

config.js ↓
```bash
module.exports = {
    // dbs: 'mongodb://139.159.253.110:27017/test1'
    mongodb+srv://用户名:<password>@cluster0.rfgfj.mongodb.net/库名?retryWrites=true&w=majority
}
```

user.js ↓

```bash
const mongoose = require('mongoose')
const feld={
    name: String,
    age: Number,
    //人物标签
    labels:Number
}
//自动添加更新时间创建时间:
let personSchema = new mongoose.Schema(feld, {timestamps: {createdAt: 'created', updatedAt: 'updated'}})
module.exports= mongoose.model('User',personSchema)
```

修改根目录app.js
```bash
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')


const mongoose = require('mongoose')
const dbconfig = require('./db/config')
mongoose.connect(dbconfig.dbs, {useNewUrlParser: true,useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose 连接成功')
});
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = appconst Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')


const mongoose = require('mongoose')
const dbconfig = require('./db/config')
mongoose.connect(dbconfig.dbs, {useNewUrlParser: true,useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose 连接成功')
});
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
```
user.js ↓

```bash
const router = require('koa-router')()
const User = require('../db/models/user')
router.prefix('/users')

router.get('/add', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
})

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
```

###重启项目
- 关掉前面我们启动的服务在运行

```bash
npm run dev
```

如下结果代表成功连接数据库

[connect]!(https://github.com/cjm-m/school-manager-user/screenshots/connect.png)


