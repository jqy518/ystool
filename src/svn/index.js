const commander = require('commander');
const inquirer = require('inquirer');
const path = require('path')
const {readJson,writeJson}  = require('../utils/file')
const {loggerTiming,loggerSuccess,loggerError,loggerInfo}  = require('../utils/logger')
const svnUtils  = require('../utils/svnUitls')

const CONFIG_FILE_NAME='.svnconfig.json'

//提交SVN
const svnFun = async function(path,isupdate) {
  try{
    if(isupdate) {
      loggerInfo('update start...')
      let res = await svnUtils.commit('update', path)
      if(res) {
        loggerInfo('update end...')
      }
    }else {
      //先cleanup
      loggerInfo('cleanup start...')
      let cvalid = await svnUtils.commit('cleanup', path)
      if (cvalid) {
        loggerSuccess('cleanup success')
        loggerInfo('commit start...')
        let svalid = await svnUtils.commit('commit', path)
        if (svalid) {
          loggerSuccess('commit success')
        }else {
          loggerError('commit failed')
        }
      }else {
        loggerError('cleanup failed')
      }
    }
  }catch(err){

  }
}
async function getAndsetPath(srcpath,tohome) {
  if(!srcpath) {
    //从本地配置中读取
    let jsonData = readJson(CONFIG_FILE_NAME)
    if(jsonData) {
      srcpath = jsonData.svnPath;
    }else {
      srcpath = await inputPath()
      //写入配置
      writeJson(CONFIG_FILE_NAME,{"svnPath":srcpath},tohome)
    }
  }else {
    //重新写入配置文件
    writeJson(CONFIG_FILE_NAME,{"svnPath":srcpath},tohome)
  }
  return path.normalize(srcpath)
}

//输入路径
function inputPath () {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'path',
      message: '请输入项目的SVN提交目录地址?',
      filter: function (val) {
        return path.normalize(val)
      }
    }]).then((answers)=>{
      return answers.path
    })
}




exports.toSvn = function() {
  const tosvn = new commander.Command('svn') //定义一个子命令
  .version('1.0.0')
  .option('-h, --home', '是否把SVN配置写入用户HOME目录')
  .option('-u, --update', '拉取SVN上的代码')
  .argument('[path]')  //<>表示必填，[]表示选填
  .action(async (path,options)=>{
    let rpath = path || ''
    let tohome = options.home || false
    let update = options.update || false
    let time = loggerTiming('SVN')
    let svnPath = await getAndsetPath(rpath,tohome)
    await svnFun(svnPath,update)
    time.end()
  })
  .addHelpText('after',`
   使用例子：
    tosvn c:\\svnproject\\myprojectdist -h
  `)
  return tosvn
}