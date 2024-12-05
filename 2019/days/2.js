const {Interpreter} = require('../utils/intcode')

const part1 = input => {
  const int = new Interpreter(input)
  int.poke(1,12)
  int.poke(2,2)
  int.run()
  return int.result()
}

module.exports = {part1}
