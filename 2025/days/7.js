const part1 = input => {
  const rows = input.split('\n')
  let beams = rows[0].split('').map(x=>x!='.')
  let splits = 0
  rows.forEach((row,i) => {
    if (i % 2 == 0) {
      let newBeams = []
      beams.forEach((beam,i) => {
        if (row[i] == '^') {
          newBeams[i-1] = true
          newBeams[i+1] = true
          splits++
        }
        else newBeams[i] = true
      })
      beams = newBeams
    }
  })
  return splits
}

const part2 = input => {
  const rows = input.split('\n')
  const x = rows[0].split('').findIndex(x=>x=='S')
  return split(rows, x, 1)
}
const split = (rows, x, y) => {
  if(y==rows.length-1) return 1
  if(rows[y][x]=='^') return split(rows,x-1,y+1) + split(rows,x+1,y+1)
  return split(rows,x,y+1)
}

module.exports = {part1,part2}
