const part1 = input => {
  const numbers = input.replaceAll(' + ','\n').split('\n').map(JSON.parse)

  console.log(numbers)
  const output = numbers.reduce((a,b)=>{
    const added = [a,b]

    let crawled

    let complete = false
    while(!complete){
      complete = true
      crawled = check(added)
      console.log('crawled ::: ',crawled)
      if(crawled.didExplode||crawled.didReduce) complete = false
      console.log('added :: ',JSON.stringify(added))
    }

    return added
  })

  // TODO: get magnitude
  return JSON.stringify(output)
}

// mutates the pair
const check = (pair,depth=0) => {

  console.log('checking pair :::', JSON.stringify(pair),depth)

  // if just a number, return
  if(!Array.isArray(pair)) return {}

  // explode
  if(depth == 4){
    return {didExplode:true,explodedPair:pair}
  }
  // else reduce
  else if(typeof pair[0] == 'number' && pair[0] >= 10){
    pair[0] = [Math.floor(pair[0]/2),Math.ceil(pair[0]/2)]
    return {didReduce:true}
  }
  else if(typeof pair[1] == 'number' && pair[1] >= 10){
    pair[1] = [Math.floor(pair[1]/2),Math.ceil(pair[1]/2)]
    return {didReduce:true}
  }

  // check further down
  
    if(typeof pair[0] != 'number'){
      const checkLeft = check(pair[0],depth+1)
      if(checkLeft.didReduce) return {didReduce:true}
      if(checkLeft.explodedPair){
        const explodedPair = pair[0]
        pair[0]=0
        
        // pass right, right
        // if number, add
        if(typeof pair[1] == 'number'){
          pair[1]+=explodedPair[1]
        }
        // else crawl up and assign to first left digit
        else crawlExplode(pair[1],value,0);

        // pass left down for next to handle
        return {didExplode:true,explodedLeft:explodedPair[0]}
      }
      if(checkLeft.explodedRight){
        crawlExplode(pair,checkLeft.explodedLeft,0)
      }
      if(checkLeft.didExplode) return {didExplode:true}
    }
    if(typeof pair[1] != 'number'){
      const checkRight = check(pair[1],depth+1)
      if(checkRight.didReduce) return {didReduce:true}
      if(checkRight.explodedPair){
        const explodedPair = pair[1]
        pair[1]=0
        // pass left, left
        // if number, add
        if(typeof pair[0] == 'number'){
          pair[0]+=explodedPair[0]
        }
        // else crawl up and assign to first right digit
        else crawlExplode(pair[0],value,1);

        // pass right down for next to handle
        return {didExplode:true,explodedRight:explodedPair[1]}
      }
      if(checkRight.explodedRight){
        crawlExplode(pair,checkRight.explodedRight,0)
      }
      if(checkRight.didExplode) return {didExplode:true}
    }

    console.log('done ::: ',JSON.stringify(pair))
    return pair
  
}
const crawlExplode = (pair,value,index) => {
  if(typeof pair[index] == 'number') pair[index]+=value
  else crawlExplode(pair[index],value,index)
}

module.exports = {part1}
