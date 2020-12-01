const part1 = input => input.split('\n').map(Number).map(
  (x,i,a)=>{
    const y = a.filter(y=>x+y===2020)[0]
    return y?x*y:null
  }
).filter(x=>x)[0]
const part2 = null

module.exports = {part1,part2}