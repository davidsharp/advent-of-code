const part1 = input => {
  let cycle = 1
  let x = 1
  let buffer = 0
  let watchedCycles = []
  const instructions = input.split('\n')
  while(instructions.length>0 || buffer){
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

  return watchedCycles.slice(0,6).reduce((a,[c,x])=>a+(c*x),0)
}

const part2 = input => {
  let cycle = 1
  let x = 1
  let buffer = 0
  let line = '#'
  let lines = []
  const instructions = input.split('\n')
  while(instructions.length>0 || buffer){
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
    const pos = cycle%40
    line = line + (pos>=x-1&&pos<=x+1?'#':'.')
    cycle++
    if(cycle%40==0){
      lines.push(line)
      line = ''
    }
  }

  return ['',...lines].join('\n')
}

module.exports = {part1,part2}
