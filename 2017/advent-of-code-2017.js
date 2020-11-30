// Honestly there's little hope of me finding the time to do all of these, but I'll give a few a go
// Naturally, everything will fall over without the expected input (it might even fall over with the correct input)

'use strict';

// Day 1 – 1
let inverseCaptcha = s => (
  s.split('').reduce((acc,c,i,a)=>(
    acc + (c===a[i<a.length-1?i+1:0]?parseInt(c):0)
  ),0)
)
// Day 1 – 2
let inverseCaptcha2 = s => {
  const seq = s.split('')
  const seqLength = seq.length
  const seqMid = seqLength/2
  return seq.reduce((acc,c,i)=>(
    console.log(c,i,i+seqMid%seqLength,seq[(i+seqMid)%seqLength],seqMid,seqLength,c===seq[(i+seqMid)%seqLength]),
    acc + (
      c===seq[(i+seqMid)%seqLength]?
        parseInt(c):0)
  ),0)
}
// thoughts: I wonder if splitting into an array is any faster than using charAt

// Day 2 – 1
let spreadsheetChecksum = s => {
  // turn the string into a 2D array
  const sheet = s.split('\n').map(c=>c.split(/\s/).filter(c=>c.length>0))
  return sheet.map(c=>c.reduce((acc,_c,i,a)=>(
    {
      hi:!acc.hi||parseInt(_c)>acc.hi?parseInt(_c):acc.hi,
      lo:!acc.lo||parseInt(_c)<acc.lo?parseInt(_c):acc.lo,
    }
  ),{})).map(_c=>(_c.hi-_c.lo)).reduce((a,c)=>(a+c),0)
}
// Day 2 – 2
let spreadsheetChecksum2 = s => {
  // turn the string into a 2D array
  const sheet = s.split('\n').map(c=>c.split(/\s/).filter(c=>c.length>0))

  return sheet.map((row,i,a)=>{
    let hi,lo;    
    return row.map((c,i)=>
      row.filter((_c,_i)=>i!=_i)
         .map(_c=>({hi:parseInt(c),lo:parseInt(_c)}))
         //.reduce(((a,c)=>(a||c.hi%c.lo===0?c:null)),null))
         .find(c=>(c.hi%c.lo===0))
      ).filter(c=>!!c)
  })
  .map(c=>c[0])
  .map(_c=>(_c.hi/_c.lo))
  .reduce((a,c)=>(a+c),0)
}
// thoughts: Thought about using a `...` in my reduce, but there's not much point for two properties
// part 2: maybe there's a good reduce-y way of doing this? row.reduce((acc,c,i,a)=>(?{hi:null,lo:null}:null),null)
//         really, there's too much array nesting that needs to be reduced out sooner

// Day 3 – 1
let spiralStepCount = n => {
    let width=1,layers=0;
    while(n>(width*width)){width+=2;layers++}
    
    let inner=width!==1?(width-2)*(width-2):1
    let outer=width*width
    let cornerDist=width-1

    let corners = [
      outer,
      outer-(cornerDist),
      outer-(cornerDist*2),
      inner+(cornerDist),
      inner //technically not, but useful for calc
    ]

    let side = corners.reduce((acc,c,i,a)=>(acc||(n<c&&n>a[i+1]?([c,a[i+1]]):(n===c?[c]:null))),null)

    // if we only have one corner the value is a corner
    if(side.length===1) return layers+(cornerDist/2);
    else return layers+( (cornerDist/2) - (side[0]-n<n-side[1]?side[0]-n:n-side[1]) )
}
// Day 3 – 2
let spiralStepCount2 = n => {
  let width=1,layers=0;
  while(n>(width*width)){width+=2;layers++}
  
  let inner=width!==1?(width-2)*(width-2):1
  let outer=width*width
  let cornerDist=width-1

  let innerLayer = [{values:[1],length:1}],outerLayer = {values:[],length:0};

  /*
    Side goes from 1 to C, C being a corner
    corners are length of a side - 1, or a total layer / 4

      C|5|4|3|2|1|C
      1|C|3|2|1|C|5
      2|1|C|1|C|3|4
      3|2|1|1|1|2|3   starts in the middle, goes right and up
      4|3|C|1|C|1|2
      5|C|1|2|3|C|1
      C|1|2|3|4|5|C... continues from here (with a 1, then goes up)
  */

  const isCorner=(index,sideLength)=>(!(sideLength%index))
  const sideIndex=(index,sideLength)=>Math.floor(index/sideLength)

  let corners = [
    outer,
    outer-(cornerDist),
    outer-(cornerDist*2),
    inner+(cornerDist),
    inner //technically not, but useful for calc
  ]

  let side = corners.reduce((acc,c,i,a)=>(acc||(n<c&&n>a[i+1]?([c,a[i+1]]):(n===c?[c]:null))),null)

  // if we only have one corner the value is a corner
  if(side.length===1) return layers+(cornerDist/2);
  else return layers+( (cornerDist/2) - (side[0]-n<n-side[1]?side[0]-n:n-side[1]) )
}
const createLayer = length => ({values:[],length:length,corners:[],width:0,cornerDist:0})
// thoughts: initially this had gross loops incrementing round, but then I figured I should do some maths

// Day 4 – 1
let passphrases = s => (//console.log(s.split(/\s/).join('\n')),
  //s.split(/\s/).reduce((map,c)=>(map.set(c,(map.get(c)||0)+1)),new Map())
  //Object.values(s.split(/\s/).reduce((o,c)=>({...o,[c]:(o[c]||0)+1}),{}))
  //  .reduce((n,c)=>(c>1?n:n+1),0)
  s.split('\n').map(c=>
    c.split(/\s/).filter(c=>c.length>0))
    .map(c=>c.reduce((o,c)=>({...o,[c]:(o[c]||0)+1}),{}))
    .reduce((n,c)=>(Object.values(c).reduce((_n,_c)=>(!_n?false:_c==1),true)?n+1:n),0)
)
// Day 4 – 2
let passphrases2 = s => (
  s.split('\n').map(c=>
    c.split(/\s/).filter(c=>c.length>0))
    .map(c=>c.reduce((o,c)=>({...o,[p_sort(c)]:(o[p_sort(c)]||0)+1}),{}))
    .reduce((n,c)=>(Object.values(c).reduce((_n,_c)=>(!_n?false:_c==1),true)?n+1:n),0)
)
const p_sort = str => (str.split('').sort().join(''))
// thoughts: initially I misread the question, and my solution was slow
//           it's still a similar solution, but now it's also dirty

// Day 5 – 1
let mazeJumper = s => {
  let position=0, steps=0
  const maze=s.split('\n').map(c=>parseInt(c))
  while(position<(maze.length)){
    let oldPos = position
    position=position+maze[position]
    maze[oldPos]=maze[oldPos]+1
    steps++
  }
  return steps
}
// Day 5 – 2
let mazeJumper2 = s => {
  let position=0, steps=0
  const maze=s.split('\n').map(c=>parseInt(c))
  while(position<(maze.length)){
    let oldPos = position
    position=position+maze[position]
    maze[oldPos]=maze[oldPos]+(maze[oldPos]>=3?-1:1)
    steps++
  }
  return steps
}

// Day 7 – 1
let tower = s => {
  // fwft (72) -> ktlj, cntj, xhth
  const programs=s.split('\n').map(c=>{
    const bits = c.split(/\(|\)\s->/)
    //if(bits[0].trim()=='xegshds')console.log(bits)
    return {
      name: bits[0].trim(),
      weight: parseInt(bits[1]),
      kids: bits[2]?bits[2].trim().split(', '):[]
    }
  })
  programs.forEach(program=>{program.kids.forEach(kid=>{
    const kidToMap = programs.find(_program=>_program.name==kid)
    if(kidToMap){
      kidToMap.parent=program.name
      //console.log('[',program,'::',kid,'::',kidToMap,']')
    }
  })})
  //return programs.find(program=>!program.parent).name
  return {programs,parent:programs.find(program=>!program.parent)}
}
// Day 7 – 2
let tower2 = s => {
  const {programs, parent} = tower(s)
  return getOffWeightKid(programs, parent)
}
const getOffWeightKid=(programs, parent)=>{
  const weights = getKidWeights(programs, parent)
  console.log(weights)
  const commonValue = ( // should all be the same except one, we just need to find two that match
    (weights[0]===weights[weights.length-1] || weights[0]===weights[weights.length-2])?
      weights[0]:weights[1]
  )
  const differentIndex = weights.findIndex(c=>c!==commonValue)
  const offWeightKid = programs.find(_program=>_program.name==parent.kids[differentIndex])
  console.log(offWeightKid)
  return offWeightKid?getOffWeightKid(programs,offWeightKid):parent
}
const getKidWeights=(programs,program)=>(
  program.kids.map(k=>recursiveWeight(programs,programs.find(_program=>_program.name==k)))
)
const recursiveWeight=(programs,program)=>(
  program.weight + program.kids.reduce(
    (a,k)=>{
      const kid = programs.find(_program=>_program.name==k)
      return a + recursiveWeight(programs,kid)
    }
    ,0
  )
)
const towerHelper=(s)=>{
  const {programs, parent} = tower(s)
  if(process.argv[3])console.log(programs.find(_program=>_program.name==process.argv[3].trim()))
}
// thoughts: almost implemented some proper tree stuff, but realised I had everything needed to output the name
// part 2: I initially tried leaves to root, but the opposite turned out to be better

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

// take some input
const input = require('fs').readFileSync(process.argv[2], 'utf8').trim();
// and output whichever task I'm solving
//console.log(spiralStepCount(361527))
console.log(registers2(input))
