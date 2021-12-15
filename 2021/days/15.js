const part1 = input => {
  // co-ords accessed backwards like: rows[y][x]
  const grid = input.split('\n').map(row=>row.split('').map(Number))
  return dijkstra(grid)
}
const part2 = input => {
  const grid = input.split('\n').map(row=>row.split('').map(Number))
  return dijkstra(grid,5)
}

const getRiskHOF = grid => {
  const height = grid.length
  const width = grid[0].length

  return xy => {
    const [x,y] = xy.split(',').map(Number)

    // how many grids over
    const gridX = Math.floor(x/width)
    const gridY = Math.floor(y/height)

    let risk = grid[y%height][x%width]
    let incrementRisk = gridX + gridY
    while(incrementRisk-->0){
      if(risk==9)risk=1
      else risk++
    }
    return risk
  }
}

// literally re-implementing Dijkstra from Wikipedia
const dijkstra = (grid,multipliedBy=1,source='0,0') => {
  const getRisk = getRiskHOF(grid)

  const Q = new Set()

  const dist = {}
  const prev = {}

  const height = grid.length * multipliedBy
  const width = grid[0].length * multipliedBy
  for(let x=0;x<width;x++)
    for(let y=0;y<height;y++){
      const v = [x,y].join(',')
      dist[v] = Infinity
      // prev[v] = undefined
      Q.add(v)
    }
  dist[source] = 0
  
  while(Q.size>0){
    // below should be a k-v tuple
    const [u] = Object.entries(dist).filter(v=>Q.has(v[0])).sort((a,b)=>a[1]-b[1])[0]
    Q.delete(u)
    const [x,y] = u.split(',').map(Number)
    const neighbours = []
    if(y+1<height)neighbours.push([x,y+1].join(','));
    if(x+1<width)neighbours.push([x+1,y].join(','));
    if(y-1>=0)neighbours.push([x,y-1].join(','));
    if(x-1>=0)neighbours.push([x-1,y].join(','));
    neighbours.forEach(
      v => {
        const alt  = dist[u] + getRisk(v)
        if(alt < dist[v]){
          dist[v]=alt
          prev[v]=u
        }
      }
    )
  }

  const S = []
  let u = [width-1,height-1].join(',')
  while(u){S.unshift(u);u=prev[u]}

  // ignore first square
  S.shift()

  return S.reduce((acc,coord)=>{
    return acc + getRisk(coord)
  },0)
}

module.exports = {part1,part2}
