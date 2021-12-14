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

const parse2 = input => {
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

  while(turns-->0){
    //console.log(`-- turn ${40-turns} | length = ${elems.length} --`)
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

const run2 = (input,turns) => {
  let [elems, insertionMap] = parse(input)
  let elemCount = [...(new Set(input.replace(/\n| |-|\>/g,'').split('')))]
    .reduce((acc,c)=>(acc[c]=0,acc),{})
  elems.split('').forEach((elem,i)=>{
    //console.log('forEach elem '+i)
    elemCount[elem]+=1
    const next = elems[i+1]
    if(next) insert([elem,next],turns,insertionMap,elemCount)
  })

  elemCount = Object.values(elemCount).sort((a,b)=>a-b)

  return elemCount.pop() - elemCount.shift()
}

const run3 = (input,turns) => {
  let [elems, insertionMap] = parse2(input)
  let elemCount = [...(new Set(input.replace(/\n| |-|\>/g,'').split('')))]
    .reduce((acc,c)=>(acc[c]=0,acc),{})
  // get the pairs
  let elemPairCount = input.split('\n\n')[1].split('\n').map(x=>x.split(' ')[0])
    .reduce((acc,c)=>(acc[c]=0,acc),{})

  elems.split('').forEach((elem,i)=>{
    console.log('forEach elem '+i)
    if(!elemPairCount[elem])elemPairCount[elem]=0
    elemPairCount[elem]+=1
    const next = elems[i+1]
    if(next) insert2([elem,next],turns,insertionMap,elemPairCount)
  })

  elemCount = Object.entries(elemPairCount).reduce((acc,[pair,value])=>{
    const [elem,next] = pair.split('')
    // if there's not a next, then it's counted from the template
    const insert = next?insertionMap?.[`${elem}${next}`]:elem
    if(insert) elemCount[insert]+=value
    return elemCount
  },elemCount)

  //console.log(elemCount)

  elemCount = Object.values(elemCount).sort((a,b)=>a-b)

  return elemCount.pop() - elemCount.shift()
}

const insert = ([elem,next],turns,rules,count) => {
  const toInsert = rules?.[elem]?.[next]
  if(toInsert && turns){
    count[toInsert]+=1
    insert([elem,toInsert],turns-1,rules,count)
    insert([toInsert,next],turns-1,rules,count)
  }
}

const insert2 = ([elem,next],turns,rules,count) => {
  const toInsert = rules?.[`${elem}${next}`]
  if(toInsert && turns){
    if(!count[`${elem}${next}`])count[`${elem}${next}`]=0
    count[`${elem}${next}`]+=1
    insert2([elem,toInsert],turns-1,rules,count)
    insert2([toInsert,next],turns-1,rules,count)
  }
}

const run4 = (input,turns) => {
  let [elems, insertionMap] = parse2(input)
  let elemCount = [...(new Set(input.replace(/\n| |-|\>/g,'').split('')))]
    .reduce((acc,c)=>(acc[c]=0,acc),{})

  let pairs = {}
  elems.split('').forEach((elem,i)=>{
    const next = elems[i+1]
    if(next){
      if(!pairs[`${elem}${next}`]) pairs[`${elem}${next}`] = 1
      else pairs[`${elem}${next}`] += 1
    }
  })

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

  console.log(pairs)

  elemCount = Object.entries(pairs).reduce((acc,[pair,value])=>{
    const [elem,next] = pair.split('')
    // if there's not a next, then it's counted from the template
    const insert = next?insertionMap?.[`${elem}${next}`]:elem
    if(insert) elemCount[insert]+=value
    return elemCount
  },elemCount)

  //console.log(elemCount)

  elemCount = Object.values(elemCount).sort((a,b)=>a-b)

  return elemCount.pop() - elemCount.shift()
}

// running multiple for part 1 to compare output
const part1 = input => [run(input,10),run4(input,10)]
const part2 = input => run4(input,40)

module.exports = {part1,part2}
