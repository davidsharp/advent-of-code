const parse = input => {
  let instructions = input.split('\n')
  return instructions.map(i=>{
    const addr = i.match(/mem\[([0-9]*)\]/)
    if(addr){
      const value = parseInt(i.split(' = ')[1])//,2)
      return {addr:parseInt(addr[1]),value}
    }
    else return {mask: parseMask(i.split(' = ')[1])}
  })
}

const parseMask = mask => [...mask].reverse().map((digit,i)=>{
    if(digit=='X')return null
    return [/*2***/i,parseInt(digit)]
  }).filter(x=>x)

const part1 = input => {
  const instructions = parse(input)
  console.log(instructions)
  let currMask = null
  const mem = []
  instructions.forEach(inst=>{
    if(inst.mask){
      currMask = inst.mask
    }
    else {
      let value = inst.value;
      console.log(value)
      currMask.forEach(digit=>{
        const [pos,expected] = digit
        if((value>>>pos)%2!=expected){
          console.log((value>>>pos).toString(2),(value>>>pos)%2,expected)
          if(expected==1){
            console.log('expected 1 :::',value,pos,2**pos)
            value+=(2**pos)
          }
          else {
            console.log('expected 0 :::', value,pos,-(2**pos))
            if(value>=2**pos)value-=(2**pos)
          }
          console.log(value)
          if(value<0)console.log('^^^ whoops, made it negative')
        }
      })
      mem[inst.addr]=value
    }
  })
  console.log(mem)
  return mem.reduce((a,b)=>a+b,0)
}

module.exports = {part1}