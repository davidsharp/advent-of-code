const parse = input => {
  let [elems, pairInsertions] = input.split('\n\n')
  // map to an object like:
  // AB -> C, DE -> F = {A:{B:C},D:{E:F}}
  const insertionMap = pairInsertions.split('\n').reduce((acc,pair)=>{
    const [a,b,c] = pair.replace(' -> ','').split('')
    acc[a]={...(acc[a]||{}),[b]:c}
    return acc
  },{})
  return [elems, insertionMap]
}

const run = (input,turns) => {
  let [elems, insertionMap] = parse(input)

  while(turns-->0){
    console.log(`-- turn ${40-turns} | length = ${elems.length} --`)
    let newStr = ''
    for(let i = 0;i<elems.length;i++){
      const elem = elems[i]
      const next = elems[i+1]
      const insert = insertionMap?.[elem]?.[next]
      newStr+=(insert?elem+insert:elem)
    }
    elems=newStr
  }
  const elemCount = Object.values(elems.split('').reduce((acc,c)=>{
    if(!acc[c])acc[c] = 0
    acc[c]+=1
    return acc
  },{})).sort((a,b)=>a-b)
  return elemCount.pop() - elemCount.shift()
}

const part1 = input => run(input,10)
const part2 = input => run(input,40)

module.exports = {part1,part2}
