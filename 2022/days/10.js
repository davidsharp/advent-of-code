const part1 = input => {
  let cycle = 1
  let x = 1
  let buffer = 0
  let watchedCycles = []
  const instructions = input.split('\n')
  while(instructions.length>0 || buffer){
    console.log(cycle,x)
    if((cycle%40)==20) watchedCycles.push([cycle,x])
    if(!buffer){
      const inst = instructions.shift()
      if(inst=='noop'){
        // no-op
      }
      else {
        buffer = Number(inst.split(' ')[1])
      }
    } else {
      x += buffer
      buffer = 0
    }
    cycle++
  }
  console.log(cycle,x)

  return watchedCycles.slice(0,6).reduce((a,[c,x])=>a+(c*x),0)
}

module.exports = {part1}
