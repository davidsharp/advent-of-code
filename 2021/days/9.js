const part1 = input => {
  const grid = input.split('\n').map(row=>row.split('').map(Number))
  const lowPoints = []
  for(let i = 0;i<grid.length;i++){
    for(let j = 0;j<grid[0].length;j++){
      // start true and disprove
      let isLow = true
      if(i-1>=0 && grid[i-1][j]<=grid[i][j])isLow=false;
      if(j-1>=0 && grid[i][j-1]<=grid[i][j])isLow=false;
      if(i+1<grid.length && grid[i+1][j]<=grid[i][j])isLow=false;
      if(j+grid[0].length && grid[i][j+1]<=grid[i][j])isLow=false;

      if(isLow)lowPoints.push(grid[i][j])
    }
  }
  return lowPoints.reduce((acc,c)=>acc+c+1,0)
}

const part2 = input => {
  const grid = input.split('\n').map(row=>row.split('').map(Number))
  const lowPoints = []
  for(let i = 0;i<grid.length;i++){
    for(let j = 0;j<grid[0].length;j++){
      // start true and disprove
      let isLow = true
      if(i-1>=0 && grid[i-1][j]<=grid[i][j])isLow=false;
      if(j-1>=0 && grid[i][j-1]<=grid[i][j])isLow=false;
      if(i+1<grid.length && grid[i+1][j]<=grid[i][j])isLow=false;
      if(j+1<grid[0].length && grid[i][j+1]<=grid[i][j])isLow=false;

      if(isLow)lowPoints.push([i,j])
    }
  }

  const basinSizes = []
  lowPoints.forEach(c=>{
    const basin = crawl(grid,new Set(),c)
    basinSizes.push(basin.size)
  })

  const [a,b,c] = basinSizes.sort((a,b)=>b-a)

  return a * b * c
}

const crawl = (grid,basin,pos) => {
  const [i,j] = pos
  basin.add(`${i},${j}`)
  if(i-1>=0 && grid[i-1][j]!=9 && !basin.has(`${i-1},${j}`))
    crawl(grid,basin,[i-1,j]);
  if(j-1>=0 && grid[i][j-1]!=9 && !basin.has(`${i},${j-1}`))
    crawl(grid,basin,[i,j-1]);
  if(i+1<grid.length && grid[i+1][j]!=9 && !basin.has(`${i+1},${j}`))
    crawl(grid,basin,[i+1,j]);
  if(j+1<grid[0].length && grid[i][j+1]!=9 && !basin.has(`${i},${j+1}`))
    crawl(grid,basin,[i,j+1]);
  return basin
}

module.exports = {part1,part2}
