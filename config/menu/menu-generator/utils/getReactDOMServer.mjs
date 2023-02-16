/*
 * Licensed Materials - Property of tenxcloud.com
 * (C) Copyright 2023 TenxCloud. All Rights Reserved.
 * ----
 * 解决 ReactDOMServer 的兼容性问题
 *
 * @author songsz
 * @date 2023-01-10
 */

const getReactDOMServer = async () => {
  let ReactDOMServer
  try {
    ReactDOMServer = await import('react-dom/server') // react-dom 18
  } catch (e) {
    ReactDOMServer = await import('react-dom/server.node.js') // react-dom < 18
  }
  return ReactDOMServer
}
export default getReactDOMServer
