import generateMenuFile from "./menu-generator/index.mjs";

generateMenuFile({
  basename: '/bc', // portal 的 basename
  filePathName: '../../dist/bc-public/menu.json', // 文件生成位置，相对当前文件的相对路径，包含文件名
  dataPathName: './data.mjs',
  metaUrl: import.meta.url,
  dataFileChangeDelay: 1*1000, // 非必填，
})
