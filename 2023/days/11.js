const part1 = input => {
  // duplicate empty rows
  let grid = input.replaceAll(/\n\.+\n/g,match=>`${match}${match}`).split('\n').filter(x=>x.length).map(row=>[...row])
  // duplicate empty columns
  let empty_col = []
  grid[0].forEach(
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
  grid = grid.map(
    row => {
      let new_row = row
      empty_col.forEach(i=>{new_row[i]=['.','.']})
      return new_row.flat()
    }
  )

  return grid.map(x=>x.join(''))
}

module.exports ={ part1 }
