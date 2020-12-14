const parse = input => {
  let instructions = input.split('\n')
  return instructions.map(i=>{
    const addr = i.match(/mem\[([0-9]*)\]/)
    if(addr){
      const value = parseInt(i.split(' = ')[1])
      return {addr:parseInt(addr[1]),value}
    }
    else return {mask: parseMask(i.split(' = ')[1])}
  })
}

const parseMask = mask => [...mask].reverse().map((digit,i)=>{
    if(digit=='X')return null
    return [i,parseInt(digit)]
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
      currMask.forEach(digit=>{
        const [pos,expected] = digit
        const valueBinary = value.toString(2)
        const checkDigit = Number(valueBinary[valueBinary.length-1-pos])
        if(checkDigit!==expected){
          if(expected==1){
            value+=(2**pos)
          }
          else {
            if(value>=2**pos)value-=(2**pos)
          }
        }
      })
      mem[inst.addr]=value
    }
  })
  return mem.reduce((a,b)=>a+b,0)
}

module.exports = {part1}