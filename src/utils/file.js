const path = require('path')
const fs  = require('fs-extra')
const os = require('os')
const {loggerError} = require('./logger')
// 项目本地路径
function getDirPath(src) {
  return path.resolve(__dirname,path)
}
exports.getDirPath = getDirPath
//获取运行路径
function getCwdPath (src) {
  return path.resolve(process.cwd(),src)
}
exports.getCwdPath = getCwdPath
//路径是否存在
exports.existsFile = function(src,fromhome) {
  const rePath = fromhome ? path.resolve(os.homedir(),src) : getCwdPath(src) 
  return fs.pathExistsSync(rePath)
}
//读JSON文件
exports.readJson = function(src,fromhome){
  const rePath = fromhome ? path.resolve(os.homedir(),src) : getCwdPath(src) 
  try{
    if(!fs.pathExistsSync(rePath)) {
      return null
    }
    const data = fs.readJSONSync(rePath)
    return data
  }catch(err) {
    loggerError(`Error reading file from disk: ${rePath}`)
    return null
  }
}
//写入JSON文件
exports.writeJson = function(fileName,data,tohome){
  const rePath = tohome ? path.resolve(os.homedir(),fileName) : getCwdPath(fileName) 
  try{
    fs.outputJsonSync(rePath, data)
    loggerSuccess('Writing file successful!')
    return rePath
  }catch(err) {
    return null
  }
}