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

function* fuelCalc(){
  let cost = 1
  let step = 1
  while(true){
    yield cost
    step++
    cost+=step
  }
}

const part2 = input => {
  const crabs = input.split(',').map(Number).sort((a,b)=>a-b)
  const min = crabs[0]
  const max = crabs[crabs.length-1]

  let lowestFuel = null
  for(let i = min;i<=max;i++){
    const consumes = crabs.reduce((fuel,crab)=>{
      const calc = fuelCalc()
      let distance = Math.abs(crab-i)
      let cost = 0
      while(distance-->0)cost=calc.next().value
      return fuel+cost
    },0)
    //console.log(`Position ${i} uses ${consumes}`)
    if(!lowestFuel || consumes<lowestFuel)
      lowestFuel = consumes
  }

  return lowestFuel
}

module.exports = {part1, part2}
