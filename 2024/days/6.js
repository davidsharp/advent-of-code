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

  let loopCount = 0
  let positions = []
  // check 3 rotations, 4th to make square is valid unless another rotation happens between
  for (let i = 0; i < rotatedAt.length - 3; i++) {
    const [a,b,c] = rotatedAt.slice(i,i+3)

    const x = a[0] == b[0] ? c[0] : a[0]
    const y = a[1] == b[1] ? c[1] : a[1]
    // hypothetical 4th point? maybe should just use 4th
    let d = [x,y,(c[2]+1)%4]

    let hit = false
    // check route c -> d
    let cx = c[0]
    let cy = c[1]
    while ((cx != d[0] || cy != d[1]) && !hit) {
      cx += directions[c[2]][0]
      cy += directions[c[2]][1]
      if (obstacles.has(`${cx},${cy}`)) hit = true
      else {
        const prevRotations = rotatedAt.slice(0,i)
        const checkDir = (c[2]+1)%4

        let found = false
        let dx = cx
        let dy = cy
        while (!found && (dx >= 0 && dy >= 0 &&
        dx < dimensions[0] && dy < dimensions[1])) {
          if (prevRotations.find(([x, y, d]) => {
            // checking that the following rotation is correct//?
            if (x == dx && y == dy /* && d == (checkDir+1)%4*/) return true
            else return false
          })) {
            found = true
          }
          dx += checkDir[0]
          dy += checkDir[1]
        }
        if(found) positions.push([dx,dy])
      }
    }

    /*
    // check route d -> a
    let dx = d[0]
    let dy = d[1]
    while ((dx != a[0] || dy != a[1]) && !hit) {
      dx += directions[d[2]][0]
      dy += directions[d[2]][1]
      if(obstacles.has(`${dx},${dy}`)) hit = true
    }
    */
    // maybe not needed with new check?
    if(!hit) positions.push([d[0],d[1]]) //loopCount++
    console.log([a,b,c,d],hit)
  }

  console.log(positions)

  return loopCount

  // assumes only squares, TODO, check for rotations to earlier rotations instead?
}

module.exports = {part1,part2}
