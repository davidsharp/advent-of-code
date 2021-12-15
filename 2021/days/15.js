const part1 = input => {
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
  //if(i-1>=0 && !visited.has(`${i-1},${j}`))
  //  attempts.push(crawl(grid,risk + grid[i-1][j],[i-1,j],new Set(visited)))
  //if(j-1>=0 && !visited.has(`${i},${j-1}`))
  //  attempts.push(crawl(grid,risk + grid[i][j-1],[i,j-1],new Set(visited)))
  return attempts.length>0?attempts.sort((a,b)=>a-b)[0]:Infinity
}

module.exports = {part1}
