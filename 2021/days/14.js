const parse = input => {
  let [elems, pairInsertions] = input.split('\n\n')
  // map to an object like:
  // AB -> C, DE -> F = {AB:C,DE:F}
  const insertionMap = pairInsertions.split('\n').reduce((acc,pair)=>{
    const [a,b,c] = pair.replace(' -> ','').split('')
    acc[`${a}${b}`]=c
    return acc
  },{})
  return [elems, insertionMap]
}

const run = (input,turns) => {
  let [elems, insertionMap] = parse(input)

  // for each turn, interate through
  //   every element and element+1 and check for a pair
  while(turns-->0){
    let newStr = ''
    for(let i = 0;i<elems.length;i++){
      const elem = elems[i]
      const next = elems[i+1]
      const insert = insertionMap?.[`${elem}${next}`]
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

const run2 = (input,turns) => {
  let [elems, insertionMap] = parse(input)
  // get all the available elements
  let elemCount = [...(new Set(input.replace(/\n| |-|\>/g,'').split('')))]
    .reduce((acc,c)=>(acc[c]=0,acc),{})

  // generate initial pairs from template
  let pairs = {}
  elems.split('').forEach((elem,i)=>{
    const next = elems[i+1]
    if(next){
      if(!pairs[`${elem}${next}`]) pairs[`${elem}${next}`] = 1
      else pairs[`${elem}${next}`] += 1
    }
  })

  // for each turn, take our current pairs object
  //  and make two new pairs for any with a matching rule
  while(turns-->0){
    let newPairs = {}
    Object.entries(pairs).forEach(
      ([pair,count]) => {
        const [a,b] = pair.split('')
        const toInsert = insertionMap?.[pair]
        if(toInsert){
          if(!newPairs[`${a}${toInsert}`]) newPairs[`${a}${toInsert}`] = count
          else newPairs[`${a}${toInsert}`] += count
          if(!newPairs[`${toInsert}${b}`]) newPairs[`${toInsert}${b}`] = count
          else newPairs[`${toInsert}${b}`] += count
        }
        else {
          if(!newPairs[pair]) newPairs[pair] = count
          else newPairs[pair] += count
        }
      }
    )
    pairs = newPairs
  }

  // count up all the letters from our pairs
  elemCount = Object.entries(pairs).reduce((acc,[pair,value])=>{
    const [elem,next] = pair.split('')
    elemCount[elem]+=value
    elemCount[next]+=value
    return elemCount
  },elemCount)

  // and divide by 2 (as we double counted most of them)
  elemCount = Object.values(elemCount).map(x=>Math.ceil(x/2)).sort((a,b)=>a-b)

  return elemCount.pop() - elemCount.shift()
}

const part1 = input => run(input,10)
const part2 = input => run2(input,40)

module.exports = {part1,part2}
