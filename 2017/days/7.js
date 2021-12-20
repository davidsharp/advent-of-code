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

// NOTE (2021): Part 2 doesn't seem to be returning the right answer (and is pretty noisy!)

module.exports = {part1:tower,part2:tower2}
