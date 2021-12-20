// Day 8 – 1
let registers = s => {
  // b inc 5 if a > 1
  const instructions=s.split('\n').map(line=>{
    const parts = line.split('if')
    const condition = parts[1].trim().split(' ') // a > 1
    const bits = parts[0].trim().split(' ') // b inc 5
    const register=bits.shift()
    const negate=bits.shift()=='dec' //add this and below into single value
    const amount=parseInt(bits.shift())
    return {register, amount:(negate?-amount:amount), condition}
  })
  const registers=instructions.reduce((a,i)=>({...a,[i.register]:0}),{});
  instructions.forEach(i=>runInstruction(registers,i))
  return registers
}
const runInstruction = (registers, instruction) => {
  const [register, operator, compareAgainst]=instruction.condition
  // > < >= <= == !=
  //console.log('doing :::',instruction)
  //console.log(`register ${instruction.register} is :::`,registers[instruction.register])
  //console.log(`condition.register ${register} is :::`,registers[register])
  switch(operator){
    case '>':
      if(registers[register] > parseInt(compareAgainst))
        registers[instruction.register] = registers[instruction.register] + instruction.amount;
      break
    case '>=':
      if(registers[register] >= parseInt(compareAgainst))
        registers[instruction.register] = registers[instruction.register] + instruction.amount;
      break
    case '<':
      if(registers[register] < parseInt(compareAgainst))
        registers[instruction.register] = registers[instruction.register] + instruction.amount;
      break
    case '<=':
      if(registers[register] <= parseInt(compareAgainst))
        registers[instruction.register] = registers[instruction.register] + instruction.amount;
      break
    case '==':
      if(registers[register] == parseInt(compareAgainst))
        registers[instruction.register] = registers[instruction.register] + instruction.amount;
      break
    case '!=':
      if(registers[register] != parseInt(compareAgainst))
        registers[instruction.register] = registers[instruction.register] + instruction.amount;
      break
    default:
      console.log(`${operator} operator doesn't seem to exist!`)
  }
  //console.log(`register ${instruction.register} is now :::`,registers[instruction.register])
}
// Day 8 – 2
let registers2 = s => {
  // b inc 5 if a > 1
  const instructions=s.split('\n').map(line=>{
    const parts = line.split('if')
    const condition = parts[1].trim().split(' ') // a > 1
    const bits = parts[0].trim().split(' ') // b inc 5
    const register=bits.shift()
    const negate=bits.shift()=='dec' //add this and below into single value
    const amount=parseInt(bits.shift())
    return {register, amount:(negate?-amount:amount), condition}
  })
  const registers=instructions.reduce((a,i)=>({...a,[i.register]:0}),{highest:0});
  instructions.forEach(i=>runInstruction2(registers,i))
  return registers
}
const runInstruction2 = (registers, instruction) => {
  const [register, operator, compareAgainst]=instruction.condition
  switch(operator){
    case '>':
      if(registers[register] > parseInt(compareAgainst))
        registers[instruction.register] = registers[instruction.register] + instruction.amount;
      break
    case '>=':
      if(registers[register] >= parseInt(compareAgainst))
        registers[instruction.register] = registers[instruction.register] + instruction.amount;
      break
    case '<':
      if(registers[register] < parseInt(compareAgainst))
        registers[instruction.register] = registers[instruction.register] + instruction.amount;
      break
    case '<=':
      if(registers[register] <= parseInt(compareAgainst))
        registers[instruction.register] = registers[instruction.register] + instruction.amount;
      break
    case '==':
      if(registers[register] == parseInt(compareAgainst))
        registers[instruction.register] = registers[instruction.register] + instruction.amount;
      break
    case '!=':
      if(registers[register] != parseInt(compareAgainst))
        registers[instruction.register] = registers[instruction.register] + instruction.amount;
      break
    default:
      console.log(`${operator} operator doesn't seem to exist!`)
  }
  // awful, but it works
  registers.highest=Object.values(registers).reduce((a,r)=>((r>a?r:a)),registers.highest)
}
// thoughts: there's a small enough number of results that I just return the list and just spotted the biggest
//           step 2's solution is basically the same, but with an extra field for the largest value

module.exports = {part1:runInstruction,part2:runInstruction2}
