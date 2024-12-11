const part1 = input => {
  let stones = input.split(' ').map(Number)
  let blinks = 25
  while (blinks-- > 0) {
    stones = stones.flatMap(stone => {
      if(stone==0) return 1
      else if (stone.toString().length % 2 == 0) {
        const str = stone.toString()
        return [
          str.slice(0,str.length/2),
          str.slice(str.length/2)
          ].map(Number)
      }
      else return stone * 2024
    })
  }
  return stones.length
}

module.exports = {part1}
