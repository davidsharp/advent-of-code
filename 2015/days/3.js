const part1 = input => {
  let i = 0
  let x = 0
  let y = 0
  let houses = new Set(['0,0'])
  while(i<input.length){
    const inst = input[i]
    if(inst == '^') y--
    if(inst == '>') x++
    if(inst == 'v') y++
    if(inst == '<') x--
    houses.add(`${x},${y}`)
    i++
  }
  return houses.size
}

module.exports = {part1}
