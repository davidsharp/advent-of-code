module.exports = {
  part1: data=>data.split('\n').reduce((a,b)=>a+Math.floor(parseInt(b)/3)-2,0),
  part2: data=>data.split('\n').reduce((a,b)=>{
    const calcFuel = m => Math.floor(parseInt(m)/3)-2
    let total = 0
    let mass = b
    while(mass>0){
      const fuelMass = calcFuel(mass)
      if(fuelMass<=0)break;
      total+=fuelMass
      mass=fuelMass
    }
    return a+total
  },0)
}