const part1 = input => {
  let i = 0
  let marker = 0
  while(!marker){
    marker = (new Set(input.slice(i,i+4))).size == 4
    i++
  }
  return i + 3
}

const part2 = input => {
  let i = 0
  let marker = 0
  while(!marker){
    marker = (new Set(input.slice(i,i+14))).size == 14
    i++
  }
  return i + 13
}

module.exports = {part1,part2}
