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

  let galaxies = []
  let row_offset = 0
  for(let row = 0;row<grid.length;row++){
    let col_offset = 0
    if(empty_row.includes(row))row_offset++
    for(let col = 0;col<grid[row].length;col++){
      if(empty_col.includes(col))col_offset++
      if(grid[row][col]=='#'){
        galaxies.push([row+row_offset,col+col_offset])
      }
    }
  }

  return {galaxies,empty_col,empty_row}
}

module.exports ={ part1 }
