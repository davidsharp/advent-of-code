const part1 = input => {
  const directions = [
    [0,-1],[1,0],[0,1],[-1,0]
  ]
  const {obstacles,guard} = input.split('\n').reduce(
    ({obstacles,guard},row,y) => {
      row.split('').forEach((space,x) => {
        if (space == '^') guard.position = [x,y]
        if (space == '#') obstacles.add(`${x},${y}`)
      })
      return {obstacles,guard}
    }, { obstacles: new Set(), guard: {position:[],direction:0} })
  const dimensions = [input.split('\n')[0].length,input.split('\n').length]
  let visited = new Set()
  while (
    guard.position[0] >= 0 && guard.position[1] >= 0 &&
    guard.position[0] < dimensions[0] && guard.position[1] < dimensions[1]
  ) {
    // mark currents space as visited
    visited.add(`${guard.position[0]},${guard.position[1]}`)
    // check next space
    const [x,y] = [guard.position[0]+directions[guard.direction][0],guard.position[1]+directions[guard.direction][1]]
    if (obstacles.has(`${x},${y}`)) {
      guard.direction += 1
      guard.direction %= 4
    } else {
      guard.position = [x,y]
    }
  }
  return visited.size
}

const part2 = input => {
  // getting rotation points instead
  const directions = [
    [0,-1],[1,0],[0,1],[-1,0]
  ]
  const {obstacles,guard} = input.split('\n').reduce(
    ({obstacles,guard},row,y) => {
      row.split('').forEach((space,x) => {
        if (space == '^') guard.position = [x,y]
        if (space == '#') obstacles.add(`${x},${y}`)
      })
      return {obstacles,guard}
    }, { obstacles: new Set(), guard: {position:[],direction:0} })
  const dimensions = [input.split('\n')[0].length,input.split('\n').length]
  const rotatedAt = []
  while (
    guard.position[0] >= 0 && guard.position[1] >= 0 &&
    guard.position[0] < dimensions[0] && guard.position[1] < dimensions[1]
  ) {
    // check next space
    const [x,y] = [guard.position[0]+directions[guard.direction][0],guard.position[1]+directions[guard.direction][1]]
    if (obstacles.has(`${x},${y}`)) {
      guard.direction += 1
      guard.direction %= 4
      rotatedAt.push([guard.position[0],guard.position[1],guard.direction])
    } else {
      guard.position = [x,y]
    }
  }

  let positions = []
  for (let i = 0; i < rotatedAt.length ; i++) {
    const c = rotatedAt[i]
    // last will go off the edge, so set to Infinity
    const next = rotatedAt[i+1] || directions[c[2]].map(n=>n*Infinity||0)

    //console.log(c,next)
    // check route c -> next
    let cx = c[0]
    let cy = c[1]
    while ((cx != next[0] || cy != next[1]) && (cx >= 0 && cy >= 0 &&
    cx < dimensions[0] && cy < dimensions[1])) {
      cx += directions[c[2]][0]
      cy += directions[c[2]][1]
      //console.log('-',c,cx,cy)

      const prevRotations = rotatedAt.slice(0,i)
      const checkDir = (c[2]+1)%4

      // turn and crawl
      let hit = false
      let found = false
      let dx = cx
      let dy = cy
      while (!hit && !found && (dx >= 0 && dy >= 0 &&
      dx < dimensions[0] && dy < dimensions[1])) {
        //console.log('--',dx,dy)
        // assume that obstacles that aren't previous rotations are bad
        if (obstacles.has(`${dx},${dy}`)){
          hit = true
        } else {
          const foundRotation = prevRotations.find(([x, y, d]) => {
            return x == dx && y == dy //check d?
          })
          if (foundRotation) {
            found = true
          }
        }
        dx += directions[checkDir][0]
        dy += directions[checkDir][1]
      }
      console.log(dx,dy,hit,found)
      if(found) positions.push([dx,dy])
    }
  }

  console.log(positions)

  return positions.length
}

module.exports = {part1,part2}
