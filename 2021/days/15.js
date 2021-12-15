const xpart1 = input => {
  // co-ords accessed backwards like: rows[y][x]
  const rows = input.split('\n').map(row=>row.split('').map(Number))
  console.log(rows)
  const lowestRisk = {value:Infinity}
  crawl(rows,0,[0,0],/*new Set(),*/lowestRisk)
  return lowestRisk.value
}

const crawl = (grid,risk,pos,/*visited=new Set(),*/lowestRisk = Infinity) => {
  if(risk>lowestRisk.value)return Infinity
  const [i,j] = pos
  //visited.add(`${i},${j}`)
  if(
    i == grid.length-1 &&
    j == grid[0].length-1
  ) {
    if(risk<lowestRisk.value){
      lowestRisk.value=risk
      console.log('new lowest risk: ',risk)
    }
    return risk
  }
  const attempts = []
  if(i+1<grid.length /*&& !visited.has(`${i+1},${j}`)*/)
    attempts.push(crawl(grid,risk + grid[i+1][j],[i+1,j],/*new Set(visited),*/lowestRisk))
  if(j+1<grid[0].length /*&& !visited.has(`${i},${j+1}`)*/)
    attempts.push(crawl(grid,risk + grid[i][j+1],[i,j+1],/*new Set(visited),*/lowestRisk))
  if(i-1>=0 /*&& !visited.has(`${i-1},${j}`)*/)
    attempts.push(crawl(grid,risk + grid[i-1][j],[i-1,j],/*new Set(visited)*/lowestRisk))
  if(j-1>=0 /*&& !visited.has(`${i},${j-1}`)*/)
    attempts.push(crawl(grid,risk + grid[i][j-1],[i,j-1],/*new Set(visited)*/lowestRisk))
  return attempts.length>0?attempts.sort((a,b)=>a-b)[0]:Infinity
}

const part1 = input => {
  // co-ords accessed backwards like: rows[y][x]
  const grid = input.split('\n').map(row=>row.split('').map(Number))
  aStar(`0,0`,[grid[0].length-1,grid.length-1].join(','),heuristic(grid),grid)
}

// literally re-implementing A* from Wikipedia
const aStar = (start,goal,h,grid) => {
  const openSet = new Set([start])
  const cameFrom = {}
  const gScore = infiniteProxy({[start]:0})
  const fScore = infiniteProxy({[start]:h(start)})
  while(openSet.size>0){
    const current = Object.entries(fScore).sort((a,b)=>a[1]-b[1])[0][0]
    if(current == goal) return reconstructPath(cameFrom,current)
    openSet.delete(current)
    const [x,y] = current.split(',').map(Number)
    const neighbours = []
    if(y+1<grid.length)neighbours.push([x,y+1].join(','));
    if(x+1<grid[0].length)neighbours.push([x+1,y].join(','));
    if(y-1>=0)neighbours.push([x,y-1].join(','));
    if(x-1>=0)neighbours.push([x-1,y].join(','));
    neighbours.forEach(
      neighbour => {
        const [x,y] = neighbour.split(',').map(Number)
        const score = gScore[current] + grid[y][x]
        if(score<gScore[neighbour]){
          cameFrom[neighbour] = current
          gScore[neighbour] = score
          fScore[neighbour] = score + h(neighbour)
          openSet.add(neighbour)
        }
      }
    )
  }
}
const reconstructPath = (cameFrom, current) => {
  const path = [current]
  while(cameFrom[current]){
    current = cameFrom[current]
    path.push(current)
  }
  return path.reverse()
}
// missing properties return Infinity
const infiniteProxy = obj => (new Proxy(obj,{get:(obj,prop)=>obj[prop]??Infinity}))
const heuristic = grid => pos => {
  const [x,y] = pos.split(',').map(Number)
  // width-x + height-y * 4.5
  return (
    (
      (grid[0].length-x) +
      (grid.length-y)
    ) * 4.5
  )
}

module.exports = {part1}
