const part1 = input => input.match(/mul\(\d+,\d+\)/g)
  .reduce((acc, instruction) => {
    const [a,b] = instruction.match(/\d+,\d+/)[0].split(',').map(Number)
    return acc + (a*b)
  },0)

const part2 = input => {
  const instructions = input.match(/do(n't)?\(\)|mul\(\d+,\d+\)/g)
  let enabled = true
  let sum = 0
  instructions.forEach(instruction => {
    if (instruction == 'do()') enabled = true
    else if (instruction == 'don\'t()') enabled = false
      else if (enabled) {
      const [a,b] = instruction.match(/\d+,\d+/)[0].split(',').map(Number)
      sum += (a*b)
    }
  })
  return sum
}

module.exports = {part1, part2}
