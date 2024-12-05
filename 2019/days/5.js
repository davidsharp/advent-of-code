const {Interpreter} = require('../utils/intcode')

const part1 = input => {
  let output = []
  const int = new Interpreter(input,x=>output.push(x))
  int.pipe(1)
  int.run()
  return output.pop()
}

module.exports = {part1}
