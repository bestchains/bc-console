import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath, pathToFileURL } from 'url';
import {mkDirIfNotExistSync} from './utils/index.mjs';
import { spawn } from 'child_process'
import getReactDOMServer from './utils/getReactDOMServer.mjs';

let ReactDOMServer
const formatMenusToCR = (data, basename) => data.map((d, index) => ({
  ...d,
  pathname: !d.pathname ? undefined : `${basename}${d.pathname}`,
  Icon: undefined,
  icon: !d.icon ? undefined : JSON.stringify({
    name: d.icon.svgData.name,
    data: ReactDOMServer.renderToStaticMarkup(d.icon.svgData.data.props.children),
  }),
  children: !d.children ? undefined : formatMenusToCR(d.children, basename),
  tenant: d.hasOwnProperty('tenant') ? d.tenant : true,
  rankingInColumn: (index + 1) * 100,
  labels: {
    portal: basename,
  }
}))

const generate = async configData => {
  ReactDOMServer = await getReactDOMServer()
  let module;
  try {
    module = await import(pathToFileURL(configData.dataPathName).toString())
  } catch (e) {
    console.warn('file not found:', e);
  }
  const data = module.default
  fs.writeFile(configData.filePathName, JSON.stringify(formatMenusToCR(data, configData.basename)), (err) => {
    if (err) return console.warn('menu: write file error', err)
    console.log(`menu：${configData.filePathName} created! Done ✅`)
  })
}

const childProcess = (file, configData) => {
  const child = spawn(process.execPath, [file], {
      env: {
        NOT_WATCH: 1,
        MENU_JSON_PATH: configData.filePathName,
      }
    }
  );
  child.stdout.on('data', (data) => {
    console.log('generateMenuFileWatch_stdout:',data.toString())
  });

  child.stderr.on('data', (data) => {
    console.error(`generateMenuFileWatch_stderr: ${data}`);
  });

  child.on('close', (code) => {
    console.log(`generateMenuFileWatch_child process exited with code: ${code}`);
  });
}

let timer
const watchFileChange = (configData) => {
  if (process.env.WATCH) {
    fs.watch(configData.dataPathName, (event, filename) => {
      if (event === 'change') {
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
          childProcess(fileURLToPath(configData.metaUrl), configData)
        }, configData.dataFileChangeDelay || 3 * 1000)
      }
    })
  }
}
/*
* @param {Object} configData - 配置选项
* @param {string} configData.basename - 项目的 basename
* @param {string} configData.filePathName - 文件生成位置，相对调用 generateMenuFile 方法的文件的相对路径，包含文件名
* @param {string} configData.dataPathName - 原始菜单数据文件位置，相对调用 generateMenuFile 方法的文件的相对路径，包含文件名
* @param {string} configData.metaUrl - 固定为 import.meta.url
* @param {number} configData.dataFileChangeDelay - 非必填，原始菜单数据文件改变后重新编译生成 menu.json 的消抖时间，毫秒，默认 3*1000 ms，可能有点慢
* 详细说明：https://gitlab.dev.21vianet.com/zhang.pengcheng3/shared/-/blob/dev-branch/menu-generator/README.md
* @example configData 示例👇
* generateMenuFile({
*   basename: '/service-mesh-management',
*   filePathName: '../../static/tdsf-public/menu.json',
*   dataPathName: './data.mjs',
*   metaUrl: import.meta.url,
*   dataFileChangeDelay: 1*1000, // 非必填，
* })
* */
const generateMenuFile = (configData) => {
  const currentFile = fileURLToPath(configData.metaUrl)
  const __dirname = path.dirname(currentFile);
  configData = {
    ...configData,
    filePathName: path.resolve(__dirname, process.env.MENU_JSON_PATH || configData.filePathName),
    dataPathName: path.resolve(__dirname, configData.dataPathName),
  }
  mkDirIfNotExistSync(path.dirname(configData.filePathName))
  watchFileChange(configData)
  generate(configData)
}

export default generateMenuFile
