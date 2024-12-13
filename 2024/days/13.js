const parse = input => {
  return input.split('\n\n').map(
    s => s.split('\n').map(x=>x.match(/\d+\b/g).map(Number))
  )
}

const part1 = input => {
  const machines = parse(input)
  return machines.reduce((tokens, [a, b, prize]) => {
    let minTokens = Infinity
    for (let i = 0; i <= 100; i++) {
      const distX = prize[0] - (a[0] * i)
      const distY = prize[1] - (a[1] * i)
      if (distX % b[0] == 0 && distY % b[1] == 0){
        const cost = (3 * i) + (distX/b[0])
        if (cost < minTokens) minTokens = cost
      }
    }
    console.log(minTokens)
    return tokens + (minTokens<Infinity?minTokens:0)
  },0)
}

module.exports = {part1}

/*
Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279
*/
