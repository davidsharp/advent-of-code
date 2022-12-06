const fn = (input,offset) => {
  let i = 0
  let marker = 0
  while(!marker){
    marker = (new Set(input.slice(i,i+offset))).size == offset
    i++
  }
  return i + offset - 1
}

const part1 = input => fn(input,4)

const part2 = input => fn(input,14)

module.exports = {part1,part2}
