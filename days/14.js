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

const parse2 = input => {
  let instructions = input.split('\n')
  return instructions.map(i=>{
    const addr = i.match(/mem\[([0-9]*)\]/)
    if(addr){
      const value = parseInt(i.split(' = ')[1])
      return {addr:parseInt(addr[1]),value}
    }
    else return {mask: i.split(' = ')[1]}
  })
}

const parseMask = mask => [...mask].reverse().map((digit,i)=>{
    if(digit=='X')return [i,'X']
    return [i,parseInt(digit)]
  })

const part1 = input => {
  const instructions = parse(input)
  let currMask = null
  const mem = []
  instructions.forEach(inst=>{
    if(inst.mask){
      currMask = inst.mask
    }
    else {
      let value = inst.value;
      currMask.filter(([,d])=>d!='X').forEach(digit=>{
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

const part2 = input => {
  const instructions = parse2(input)
  let currMask = null
  const mem = new Map()
  instructions.forEach(inst=>{
    if(inst.mask) currMask = inst.mask
    else {
      let addr = inst.addr.toString(2).padStart(36,0).split('');
      // replace 1s and Xs
      addr = addr.map((bit,i)=>{
        if(currMask[i]=='1') return 1;
        else if(currMask[i]=='X') return 'X';
        else return bit;
      }).join('')
      const floaters = addr.split('X')
      let addresses = floaters.reduce((acc,floater)=>{
        if(acc.length==0) return [floater]
        const ones = [...acc].map(x=>x+'0'+floater)
        const zeroes = [...acc].map(x=>x+'1'+floater)
        return [...ones,...zeroes]
      },[])
      addresses.forEach(addr=>mem.set(parseInt(addr,2),inst.value))
    }
  })
  return [...mem.values()].reduce((a,b=0)=>a+b,0)
}

module.exports = {part1,part2}