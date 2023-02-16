import * as fs from 'fs'

export const mkDirIfNotExistSync = path => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, {recursive: true})
  }
}