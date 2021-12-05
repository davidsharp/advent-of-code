const part1 = input => {
   const lines = input.split('\n').map(line=>{
    const [start, end] = line.split(' -> ').map(c=>{
      const [x,y] = c.split(',').map(Number)
      return {x,y}
    })
    return {start, end}
  }).filter(line=>line.start.x==line.end.x||line.start.y==line.end.y)

  const ventPositions = {}
  lines.forEach(line=>{
    let {x,y} = line.start
    const {end} = line
    // just being lazy and doing both
    // since one'll basically no-op
    while(x!=end.x){
      //console.log(`${line.start.x},${line.start.y}->${end.x},${end.y}`,x,y)
      ventPositions[`${x},${y}`] = (
        ventPositions[`${x},${y}`]?
          ventPositions[`${x},${y}`] + 1 : 1
      )
      x<end.x?x++:x--
    }
    while(y!=end.y){
      //console.log(`${line.start.x},${line.start.y}->${end.x},${end.y}`,x,y)
      ventPositions[`${x},${y}`] = (
        ventPositions[`${x},${y}`]?
          ventPositions[`${x},${y}`] + 1 : 1
      )
      y<end.y?y++:y--
    }
    // once more for the final position
    ventPositions[`${x},${y}`] = (
      ventPositions[`${x},${y}`]?
        ventPositions[`${x},${y}`] + 1 : 1
    )
  })

  // count dangerous vents
  return Object.values(ventPositions).filter(x=>x>1).length
}

const part2 = input => {
  const lines = input.split('\n').map(line=>{
   const [start, end] = line.split(' -> ').map(c=>{
     const [x,y] = c.split(',').map(Number)
     return {x,y}
   })
   return {start, end}
 })

 const ventPositions = {}
 lines.forEach(line=>{
   let {x,y} = line.start
   const {end} = line
   while(x!=end.x || y!=end.y){
     //console.log(`${line.start.x},${line.start.y}->${end.x},${end.y}`,x,y)
     ventPositions[`${x},${y}`] = (
       ventPositions[`${x},${y}`]?
         ventPositions[`${x},${y}`] + 1 : 1
     )
     if(x!=end.x)x<end.x?x++:x--
     if(y!=end.y)y<end.y?y++:y--
   }
   // once more for the final position
   ventPositions[`${x},${y}`] = (
     ventPositions[`${x},${y}`]?
       ventPositions[`${x},${y}`] + 1 : 1
   )
 })

 // count dangerous vents
 return Object.values(ventPositions).filter(x=>x>1).length
}

module.exports = {part1, part2}
