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

const part2 = input => {
  let stones = {}
  input.split(' ').forEach(
    stone => {
      if(!stones[stone]) stones[stone] = 0
      stones[stone]++
    }
  )

  let blinks = 75
  while (blinks-- > 0) {
    let temp = {}
    Object.entries(stones).forEach(
      ([stone, count]) => {
        if (stone == 0) {
          if(!temp[1]) temp[1] = 0
          temp[1]+=count
        }
        else if (stone.toString().length % 2 == 0) {
          const str = stone.toString()
          ;[
            str.slice(0,str.length/2),
            str.slice(str.length/2)
          ].map(Number).map(x => {
            if(!temp[x]) temp[x] = 0
            temp[x]+=count
          })
        }
        else {
          if(!temp[stone*2024]) temp[stone*2024] = 0
          temp[stone*2024]+=count
        }
      }
    )
    stones = temp
  }
  return Object.values(stones).reduce((a,b)=>a+b)
}

module.exports = {part1, part2}
