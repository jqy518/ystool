const chalk = require('chalk')

exports.loggerInfo = (str)=>{
  console.log(chalk.blue(`[INFO]:${str}`))
}
exports.loggerWarring = (str)=>{
  console.log(chalk.yellowBright(`[WARRING]:${str}`))
}
exports.loggerSuccess = (str)=>{
  console.log(chalk.greenBright(`[SUCCESS]:${str}`))
}
exports.loggerError = (str)=>{
  console.log(chalk.redBright(`[ERROR]:${str}`))
}
exports.loggerTiming = (str)=>{
  let timeflag = Math.random().toString(16).substr(2) //产生一个随机字符
  console.time(timeflag)
  console.log(chalk.cyan(`****** ${str} START ******`))
  const end = () => {
    console.log(chalk.cyan(`****** ${str} END ******`))
    console.timeEnd(timeflag)
  }
  return {
    end
  }
}