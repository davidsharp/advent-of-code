const part1 = input => {
  let i = 0
  let marker = 0
  while(!marker){
    marker = (new Set(input.slice(i,i+4))).size == 4
    i++
  }
  return i + 3
}

module.exports = {part1}
