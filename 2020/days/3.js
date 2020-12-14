const parse = input => input.split('\n').map(row=>row.split(''))

const part1 = input => { //r3-d1
  const forest = parse(input)
  let treesHit = 0
  let x = 0
  forest.forEach(row=>{
    if(row[x%row.length]=='#')treesHit++
    x+=3
  })
  return treesHit
}
const part2 = input => {
  const forest = parse(input)
  const routes = [
    {inc: 1}, //Right 1, down 1.
    {inc: 3}, //Right 3, down 1.
    {inc: 5}, //Right 5, down 1.
    {inc: 7}, //Right 7, down 1.
    {inc: 1, steep:true}, //Right 1, down 2.
  ]
  const width = forest[0].length
  const routeResults = routes.map(route=>{
    let x = 0
    let y = 0
    let treesHit = 0
    while(y<forest.length){
      if(forest[y][x%width]=='#')treesHit++
      x+=route.inc
      y+=route.steep?2:1
    }
    return treesHit
  })
  return routeResults.reduce((a,r)=>a?a*r:r,0)
}

module.exports = {part1,part2}