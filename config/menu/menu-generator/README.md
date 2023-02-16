# menu-generator

menu-generator 是一个 NodeJS 的菜单生成工具。

将前端各个 portal 原始菜单打包转换成新版的导航的 menu.json 文件，用来生成 k8s 的menu CR


# 使用方法
## 编写 index.mjs

### 配置参数

`generateMenuFile(configData)`

#### configData 参数
| 参数                  | 说明  | 类型|
|---------------------|-------------------------------|----------------------------------|
| basename            | portal 的 basename | string|
| filePathName        | 文件生成位置，⚠️相对调用 generateMenuFile 方法的文件的相对路径，包含文件名 | string|
| dataPathName        | [原始菜单数据文件](https://gitlab.dev.21vianet.com/sbg2-tenxcloud/contrib/tenx-ui/dock-app/-/blob/master/wiki/menu/index.md)位置，⚠️相对调用 generateMenuFile 方法的文件的相对路径，包含文件名 | string|
| metaUrl             | 固定为 import.meta.url, 调用 generateMenuFile 方法的文件的位置 | import.meta.url|
| dataFileChangeDelay | 非必填，原始菜单数据文件改变后重新编译生成 menu.json 的消抖时间，毫秒，默认 3*1000 ms，可能有点慢  | number|

#### 举例：
以 tdsf-portal 的使用方法为例：

```javascript
import generateMenuFile from "../../shared/menu-generator/index.mjs";

generateMenuFile({
  basename: '/service-mesh-management',
  filePathName: '../../static/tdsf-public/menu.json',
  dataPathName: './data.mjs',
  metaUrl: import.meta.url,
  dataFileChangeDelay: 1*1000, // 非必填，
})
```

## 执行
### 终端中
- 编译一次：`node ./path/to/index.mjs` 
- 使用 node 环境变量 **WATCH=1**，监控文件变化，自动执行编译：`cross-env WATCH=1 node ./path/to/index.mjs`
### 修改 package.json
```json lines
// package.json - tdsf-portal 为例
{
  "scripts": {
    // 将 data.mjs 编译成 menu.json，可用于构建使用
    "build:menu": "node ./config/menu/index.mjs",
    // webpack 子应用：增加了 node 环境变量 WATCH=1，监控文件变化，自动执行编译，可用于开发时使用
    "build:menu-watch": "cross-env WATCH=1 node ./config/menu/index.mjs",
    // umi 子应用：
    // ⚠️ 一定要按照下面的写哦，为了解决 生成的menu.json不更新的问题，加入 60s 延时启动菜单监听服务
    // 增加了 node 环境变量：
    //  - WATCH=1，监控文件变化；
    //  - MENU_JSON_PATH=../../public/menu.json，指定 menu.json 输出路径到public目录下
    // 自动执行编译，可用于开发时使用
    "build:menu-watch": "echo '菜单监听任务将在60s后启动 ⚠️' && sleep 60 && cross-env WATCH=1 MENU_JSON_PATH=../../public/menu.json node ./config/menu/index.mjs",
    // 开发的 dev 命令修改下，前面增加 `npm run build:menu-watch & `
    "dev": "npm run build:menu-watch & cross-env NODE_ENV=development NODE_OPTIONS=--max_old_space_size=4096 webpack serve --config webpack_config/client.js --progress",
    // 构建 build 命令修改，构建成功后编译菜单文件，在最后增加 ` && npm run build:menu`
    "build:front-end": "webpack --config webpack_config/client.js --progress && npm run build:menu",
  }
}
```
