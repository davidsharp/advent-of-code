const parse = input => {
  const grid = input.split('\n').map(row=>row.split(''))
  const rolls = new Set()
  grid.forEach(
    (row, y) => row.forEach((unit, x) => {
      if (unit == '@') {
        rolls.add(`${x},${y}`)
      }
    })
  )
  return rolls
}

const part1 = input => {
  const rolls = parse(input)
  let total = 0
  rolls.forEach(roll => {
    const [x,y] = roll.split(',').map(Number)
    let count = 0
    for (let i=-1;i<=1;i++) {
      for (let j=-1;j<=1;j++) {
        if (rolls.has(`${x+i},${y+j}`)) {
          count++
        }
      }
    }
    if(count<=4)total++
  })
  return total
}

const part2 = input => {
  const rolls = parse(input)
  const remainingRolls = removeRolls(rolls)
  return rolls.size - remainingRolls.size
}
const removeRolls = (rolls) => {
  const nextRolls = new Set([...rolls])
  nextRolls.forEach(roll => {
    const [x,y] = roll.split(',').map(Number)
    let count = 0
    for (let i=-1;i<=1;i++) {
      for (let j=-1;j<=1;j++) {
        if (rolls.has(`${x+i},${y+j}`)) {
          count++
        }
      }
    }
    if (count <= 4) {
      nextRolls.delete(roll)
    }
  })
  return rolls.size == nextRolls.size ? nextRolls : removeRolls(nextRolls)
}

module.exports = {part1,part2}
