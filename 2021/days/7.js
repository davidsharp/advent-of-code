const part1 = input => {
  const crabs = input.split(',').map(Number).sort((a,b)=>a-b)
  const min = crabs[0]
  const max = crabs[crabs.length-1]

  let lowestFuel = null
  for(let i = min;i<=max;i++){
    const consumes = crabs.reduce((fuel,crab)=>{
      return fuel+Math.abs(crab-i)
    },0)
    //console.log(`Position ${i} uses ${consumes}`)
    if(!lowestFuel || consumes<lowestFuel)
      lowestFuel = consumes
  }

  return lowestFuel
}

const part2 = input => {
  const crabs = input.split(',').map(Number).sort((a,b)=>a-b)
  const min = crabs[0]
  const max = crabs[crabs.length-1]

  let lowestFuel = null
  for(let i = min;i<=max;i++){
    const consumes = crabs.reduce((fuel,crab)=>{
      let distance = Math.abs(crab-i)
      let cost = 0
      let step = 0
      while(distance-->0){
        step++
        cost+=step
      }
      return fuel+cost
    },0)
    //console.log(`Position ${i} uses ${consumes}`)
    if(!lowestFuel || consumes<lowestFuel)
      lowestFuel = consumes
  }

  return lowestFuel
}

module.exports = {part1, part2}
