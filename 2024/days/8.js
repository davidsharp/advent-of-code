const parse = input => {
  const antennas = input.split('\n').map(line => line.split('')).reduce((ant, row, y) => {
    row.forEach((space, x) => {
      if (space != '.') {
        if (!ant[space]) ant[space] = []
        ant[space].push([x,y])
      }
    })
    return ant
  }, {})
  return {antennas,height:input.split('\n').length,width:input.split('\n')[0].length}
}

const part1 = input => {
  const {antennas,height,width} = parse(input)

  const antinodes = new Set()
  Object.entries(antennas).forEach(
    ([freq, ants]) => {
      ants.forEach((ant, i) => {
        const compareWith = ants.slice(i+1)
        const _antinodes = compareWith.flatMap(
          bnt => {
            const diff = [ant[0]-bnt[0],ant[1]-bnt[1]]
            return [
              [ant[0]+diff[0],ant[1]+diff[1]],
              [bnt[0]-diff[0],bnt[1]-diff[1]]
            ]
          }
        )
        _antinodes.forEach(([x,y])=>{
          if(x >= 0 && y >= 0 && x < width && y < height){
            antinodes.add(`${x},${y}`)
          }
        })
      })
    }
  )
  return antinodes.size
}

const part2 = input => {
  const {antennas,height,width} = parse(input)

  const antinodes = new Set()
  Object.entries(antennas).forEach(
    ([freq, ants]) => {
      ants.forEach((ant, i) => {
        const compareWith = ants.slice(i+1)
        const _antinodes = compareWith.flatMap(
          bnt => {
            const diff = [ant[0]-bnt[0],ant[1]-bnt[1]]
            const __antinodes = []
            let ax = ant[0]
            let ay = ant[1]
            while (ax >= 0 && ay >= 0 && ax < width && ay < height) {
              __antinodes.push([ax,ay])
              ax += diff[0]
              ay += diff[1]
            }
            let bx = bnt[0]
            let by = bnt[1]
            while (bx >= 0 && by >= 0 && bx < width && by < height) {
              __antinodes.push([bx,by])
              bx -= diff[0]
              by -= diff[1]
            }

            return __antinodes
          }
        )
        _antinodes.forEach(([x,y])=>{
          if(x >= 0 && y >= 0 && x < width && y < height){
            antinodes.add(`${x},${y}`)
          }
        })
      })
    }
  )
  return antinodes.size
}

module.exports = {part1, part2}
