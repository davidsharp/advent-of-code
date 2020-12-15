const parse = input => input.split(',').map(Number)

const part1 = input => {
  const startingNos = parse(input)
  const spoken = new Map()
  let lastSpoken = null
  let count = 0
  while(count<2020){
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

module.exports = {part1}