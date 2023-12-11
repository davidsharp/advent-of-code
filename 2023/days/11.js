const part1 = input => {
  let grid = input.split('\n')
  //columns
  let empty_col = [];
  [...grid[0]].forEach(
    (c,i) => {
      if(c=='.'){
        let empty = true
        let row = 1
        while(empty&&row<grid.length){
          if(grid[row][i]!='.')empty = false
          row++
        }
        if(empty) empty_col.push(i)
      }
    }
  )
  //rows
  let empty_row = []
  grid.forEach((row,i)=>{if(!row.includes('#'))empty_row.push(i)})

  return {empty_col,empty_row}
}

module.exports ={ part1 }
