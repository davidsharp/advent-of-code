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
  return splits //beams.reduce((count,beam)=>beam?count+1:count,0)
}

module.exports = {part1}
