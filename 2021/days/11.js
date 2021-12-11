const part1 = input => {
  let grid = input.split('\n').map(row=>row.split('').map(Number))
  let turns = 2
  let flashes = 0
  while(turns-->0){
    // plus 1
    grid = grid.map(row=>row.map(octo=>octo+1))
    /*grid.forEach(
      (row,i) => row.forEach(
        (octo,j) => {
          if(octo == 10)flash(grid,i,j)
        }
      )
    )*/
    for(let i = 0;i<grid.length;i++)
        for(let j = 0;j<grid[0].length;j++)
          if(grid[i][j]==10)flash(grid,i,j)
    // reset flashes (and count here)
    grid = grid.map(row=>row.map(octo=>{
      const flashed = octo>9
      if(flashed)flashes++
      return flashed?0:octo
    }))
  }

  console.log(grid)

  return flashes
}

const flash = (grid,x,y) => {
  // increment
  grid[x][y]++
  // only do knock-on flashes if number == 10
  //  as higher numbers will have flashed already
  if(grid[x][y] == 10+1){
    if(grid[x-1]){
      if(grid[x-1][y-1])flash(grid,x-1,y-1)
      if(grid[x-1][y+1])flash(grid,x-1,y+1)
      if(grid[x-1][y])flash(grid,x-1,y)
    }
    if(grid[x][y-1])flash(grid,x,y-1)
    if(grid[x][y+1])flash(grid,x,y+1)
    if(grid[x+1]){
      if(grid[x+1][y-1])flash(grid,x+1,y-1)
      if(grid[x+1][y+1])flash(grid,x+1,y+1)
      if(grid[x+1][y])flash(grid,x+1,y)
    }
  }

}

module.exports = {part1}
