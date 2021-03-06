const parse = input => input.split('\n').map(inst=>{
  const [op, arg] = inst.split(' ')
  return {op, arg:Number(arg)}
})

const part1 = input => {
  const instructions = parse(input)
  let global = 0
  let pointer = 0
  let set = new Set()
  while(!set.has(pointer)){
    set.add(pointer)
    const {op,arg} = instructions[pointer]
    if(op=='acc'){
      global+=arg
      pointer++;
    }
    if(op=='jmp')pointer+=arg;
    if(op=='nop')pointer++;
  }
  return global
}
const part2 = input => {
  const instructions = parse(input)
  let set = new Set()
  const goal = instructions.length
  set.add(goal)
  return fromState({global:0,pointer:0,set,instructions,goal})[1]
}
const fromState = ({global,pointer,set:_set,instructions,goal,branched=false}) => {
  const set = new Set(_set)
  while(!set.has(pointer)){
    set.add(pointer)
    const {op,arg} = instructions[pointer]
    if(op=='acc'){
      global+=arg
      pointer++;
    }
    if(op=='jmp'){
      if(!branched){
        const [success, _global] = fromState({global,pointer:pointer+1,set,instructions,goal,branched:true})
        if(success){return [success,_global]}
      }
      pointer+=arg;
    }
    if(op=='nop'){
      if(!branched){
        const [success,_global] = fromState({global,pointer:pointer+arg,set,instructions,goal,branched:true})
        if(success){return [success,_global]}
      }
      pointer++;
    }
  }
  return [pointer==goal,global];
}

module.exports = { part1, part2 }

/*
acc increases or decreases a single global value called the accumulator by the value given in the argument. For example, acc +7 would increase the accumulator by 7. The accumulator starts at 0. After an acc instruction, the instruction immediately below it is executed next.
jmp jumps to a new instruction relative to itself. The next instruction to execute is found using the argument as an offset from the jmp instruction; for example, jmp +2 would skip the next instruction, jmp +1 would continue to the instruction immediately below it, and jmp -20 would cause the instruction 20 lines above to be executed next.
nop stands for No OPeration - it does nothing. The instruction immediately below it is executed next.
*/