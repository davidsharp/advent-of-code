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

module.exports = {part1}
