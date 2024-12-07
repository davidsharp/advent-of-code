const parse = input => input.split('\n').map(
  line => {
    const [value,...numbers] = line.match(/\d+\b/g).map(Number)
    return {value,numbers}
  }
)

const part1 = input => {
  const equations = parse(input)
  return equations.reduce((acc, eq) => {
    const { value:target, numbers } = eq
    let x = 0
    let found = false
    while (!found && x < 2 ** (numbers.length)) {
      const calc = numbers.reduce((sum, num, i) => {
        if ((x >> i) % 2) return sum * num
        else return sum + num
      },0)
      if(calc == target) found = true
      x++
    }
    return acc + (found?target:0)
  },0)
}

module.exports = {part1}
