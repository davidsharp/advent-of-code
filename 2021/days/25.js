const part1 = input => {
  const rows = input.split('\n')
  const width = rows[0].length
  const height = rows.length

  let downCukes = new Set()
  let rightCukes = new Set()
  rows.forEach(
    (row,y) => {
      for(let x=0;x<width;x++){
        let cuke = row[x]
        if(cuke == 'v')downCukes.add(`${x},${y}`)
        if(cuke == '>')rightCukes.add(`${x},${y}`)
      }
    }
  )

  let moves = 0
  let ended = false
  while(!ended){
    ended = !takeTurn(rightCukes,downCukes,width,height)
    moves++
  }

  return moves
}

const takeTurn = (rightCukes,downCukes,width,height) => {
  let changed = false
  let rcClone = new Set(rightCukes)
  const dcClone = new Set(downCukes)
  ;[...rightCukes].forEach(cuke => {
    const [x,y] = cuke.split(',').map(Number)
    const newCuke = `${(x+1)%width},${y}`
    if(
      rcClone.has(newCuke) ||
      dcClone.has(newCuke)
    );
    else {
      changed = true
      rightCukes.delete(cuke)
      rightCukes.add(newCuke)
    }
  })
  // re-clone, 'cause they've moved
  rcClone = new Set(rightCukes)
  ;[...downCukes].forEach(cuke => {
    const [x,y] = cuke.split(',').map(Number)
    const newCuke = `${x},${(y+1)%height}`
    if(
      rcClone.has(newCuke) ||
      dcClone.has(newCuke)
    );
    else {
      changed = true
      downCukes.delete(cuke)
      downCukes.add(newCuke)
    }
  })
  return changed
}

module.exports = {part1} 
