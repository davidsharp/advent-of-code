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

const part2 = input => {
  const equations = parse(input)
  return equations.reduce((acc, eq) => {
    const { value:target, numbers } = eq
    let x = 0
    let found = false
    while (!found && x < 3 ** (numbers.length-1)) {
      //console.log(x.toString(3).padStart(3,'0'))
      const operators = numbers.slice(0,-1).map((num,i) => (x.toString(3).padStart(numbers.length-1)[i])).map(Number)
      const calc = numbers.reduce((sum, num, i) => {
        const op = operators[i-1]
        //console.log(sum,op==0?'*':op==1?'+':'||',num)
        if (op == 0) return sum * num
        if (op == 1) return sum + num
        if (op == 2) return Number(`${sum}${num}`)
      })
      //console.log(calc)
      if(calc == target) found = true
      x++
    }
    return acc + (found?target:0)
  },0)
}

module.exports = {part1, part2}
