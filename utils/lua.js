const child_process = require('child_process')

const runLua = (script,input) => {
  child_process.exec(`lua ${script} ${input}`,void 0,(_,x)=>console.log(x))
}

module.exports = runLua