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
  const initialGuardPosition = [...guard.position]
  const rotatedAt = [[...guard.position,guard.direction]]
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
  const attemptedObstacles = new Set([`${initialGuardPosition[0]},${initialGuardPosition[1]}`])
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
      const guard = {position:[...initialGuardPosition],direction:0}//{position:[cx,cy],direction:c[2]}

      cx += directions[c[2]][0]
      cy += directions[c[2]][1]

      // skip it if we've tried before
      if (
        attemptedObstacles.has(`${cx},${cy}`) ||
        // or if outside
        (cx < 0 || cy < 0 || cx > dimensions[0] || cy > dimensions[1])
      ){
        console.log('would skip',attemptedObstacles.has(`${cx},${cy}`),cx,cy,attemptedObstacles)
        break;
      }
      attemptedObstacles.add(`${cx},${cy}`)

      console.log('obby: ',cx,cy)

      const newObstacles = new Set([...obstacles,`${cx},${cy}`])
      const visited = new Set()
      let loopFound = false
      // just re-run a walk through
      while (
        !loopFound &&
        guard.position[0] >= 0 && guard.position[1] >= 0 &&
        guard.position[0] < dimensions[0] && guard.position[1] < dimensions[1]
      ) {
        // check next space
        const [x,y] = [guard.position[0]+directions[guard.direction][0],guard.position[1]+directions[guard.direction][1]]
        if (newObstacles.has(`${x},${y}`)) {
          guard.direction += 1
          guard.direction %= 4
          console.log('guard turned: ',directions[guard.direction])
        } else {
          guard.position = [x,y]
          console.log('guard moved to: ',x,y)
          const key = `${x},${y},${guard.direction}`
          if(visited.has(key))loopFound = true
          else visited.add(key)
        }
      }
      if(loopFound) positions.push([cx,cy])
      if(loopFound) console.log('found loop',cx,cy)
    }
  }

  console.log(positions)

  return positions.length
}

module.exports = {part1,part2}

/*
###
#.#
.^#
###
*/
