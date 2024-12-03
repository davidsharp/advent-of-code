const part1 = input => input.match(/mul\(\d+,\d+\)/g)
  .reduce((acc, instruction) => {
    const [a,b] = instruction.match(/\d+,\d+/)[0].split(',').map(Number)
    return acc + (a*b)
  },0)

module.exports = {part1}
