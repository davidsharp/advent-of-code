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

module.exports = {part1}
