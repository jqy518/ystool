const { exec } = require('child_process')
const SvnUitls = {
  commit(commit, path) {
    return new Promise((resolve, reject) => {
      let command = `TortoiseProc.exe /command:${commit} /path:"${path}"`
      exec(command, (error) => {
        if (error) {
          reject(error)
        } else {
          resolve(true)
        }
      })
    })
  }
}
module.exports = SvnUitls