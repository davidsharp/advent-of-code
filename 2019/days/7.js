const {Interpreter} = require('../utils/intcode')

const part1 = data => {
  const phases = [0,1,2,3,4]
  return runAmp(data,phases,0)
}
const runAmp = (program, remainingPhases, input) => {
  if(remainingPhases.length == 0) return input
  let highest = 0
  for (let i = 0; i < remainingPhases.length; i++) {
    const phase = remainingPhases[i]
    let out = null
    const int = new Interpreter(program,o=>out=o)
    int.pipe(phase)
    int.pipe(input)
    int.run()
    const x = runAmp(
      program,
      remainingPhases.toSpliced(i,1),
      out
    )
    if (x > highest) highest = x
  }
  return highest
}

module.exports = {part1}
