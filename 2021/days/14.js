const part1 = input => {
  let turns = 10
  let [elems, pairInsertions] = input.split('\n\n')
  // map to an object like:
  // AB -> C, DE -> F = {A:{B:C},D:{E:F}}
  const insertionMap = pairInsertions.split('\n').reduce((acc,pair)=>{
    const [a,b,c] = pair.replace(' -> ','').split('')
    acc[a]={...(acc[a]||{}),[b]:c}
    return acc
  },{})
  while(turns-->0){
    elems = elems.split('').map(
      (elem,i) => {
        const next = elems[i+1]
        if(!next) return elem
        const insert = insertionMap?.[elem]?.[next]
        if(insert) return elem+insert
        return elem
      }
    ).join('')
  }
  const elemCount = Object.values(elems.split('').reduce((acc,c)=>{
    if(!acc[c])acc[c] = 0
    acc[c]+=1
    return acc
  },{})).sort((a,b)=>a-b)
  return elemCount.pop() - elemCount.shift()
}

module.exports = {part1}
