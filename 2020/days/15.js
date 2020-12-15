const parse = input => input.split(',').map(Number)

const solution = solveForTurn => input => {
  const startingNos = parse(input)
  const spoken = new Map()
  let lastSpoken = null
  let count = 0
  while(count<solveForTurn){
    if(count<startingNos.length){
      if(lastSpoken!==null)spoken.set(lastSpoken,count)
      lastSpoken=startingNos[count]
    }
    else{
      if(spoken.has(lastSpoken)){
        const lastIndex = spoken.get(lastSpoken)
        spoken.set(lastSpoken,count)
        lastSpoken = count-lastIndex
      }
      else {
        spoken.set(lastSpoken,count)
        lastSpoken = 0
      }
    }
    count++
  }
  return lastSpoken
}

const part1 = solution(2020)
const part2 = solution(30_000_000)

module.exports = {part1,part2}