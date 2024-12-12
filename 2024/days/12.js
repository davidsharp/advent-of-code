const part1 = input => {
  const farm = input.split('\n').map(x=>x.split('').map(x=>[x,false]))
  const crawl = (x, y) => {
    const plant = farm[y][x]
    if(plant[1]) return [null,null]
    farm[y][x][1] = true // mark as checked
    const directions = [[0,-1],[0,1],[-1,0],[1,0]]
    let area = 1
    let perimeter = 0
    for (let [dx, dy] of directions) {
      const checking = farm[y + dy]?.[x + dx]
      if (checking?.[0] == plant[0]) {
        if(!checking[1]){
          const [a, p] = crawl(x + dx, y + dy)
          area += a
          perimeter += p
        }
      }
      else { perimeter++ }
    }
    return [area,perimeter]
  }
  let sum = 0
  for (let y = 0; y < farm.length; y++) {
    for (let x = 0; x < farm[0].length; x++) {
      const [area, perimeter] = crawl(x,y)
      if (area !== null) {
        sum += (area * perimeter)
      }
    }
  }
  return sum
}

const part2 = input => {
  const farm = input.split('\n').map(x=>x.split('').map(x=>[x,false]))
  const crawl = (x, y) => {
    const plant = farm[y][x]
    if(plant[1]) return [null,null]
    farm[y][x][1] = true // mark as checked
    const directions = [[0,-1],[0,1],[-1,0],[1,0]]
    let area = 1
    let edges = []
    for (let [dx, dy] of directions) {
      const checking = farm[y + dy]?.[x + dx]
      if (checking?.[0] == plant[0]) {
        if(!checking[1]){
          const [a, e] = crawl(x + dx, y + dy)
          area += a
          edges = [...edges,...e]
        }
      }
      else {
        // adding out edges
        // [[startX,startY],[endx,endY],d]
        if (dx == 0) {
          edges.push([
            [x,y+(dy==1?1:0)].toString(),
            [x+1,y+(dy==1?1:0)].toString(),
            0+(dy==1?1:0), // horizontal
          ])
        }
        else {
          edges.push([
            [x+(dx==1?1:0),y].toString(),
            [x+(dx==1?1:0),y+1].toString(),
            2+(dx==1?1:0), // vertical
          ])
        }
      }
    }
    return [area,edges]
  }
  let sum = 0
  for (let y = 0; y < farm.length; y++) {
    for (let x = 0; x < farm[0].length; x++) {
      const [area, edges] = crawl(x,y)
      if (area !== null) {
        const sides = edges.reduce((sides, edge) => {
          const sideBefore = sides.findIndex(side=>(
            side[2] == edge[2] &&
            side[0] == edge[1]
          ))
          const sideAfter = sides.findIndex(side=>(
            side[2] == edge[2] &&
            side[1] == edge[0]
          ))
          if (sideBefore>-1 || sideAfter>-1) {
            if(sideBefore>-1) sides[sideBefore][0] = edge[0]
            if(sideAfter>-1) sides[sideAfter][1] = edge[1]
            if(sideBefore>-1 && sideAfter>-1) sides[sideAfter][2]='x' // mark for removal
          }
          else sides.push(edge)
          return sides.filter(side=>side[2]!='x')
        },[])
        sum += (area * sides.length)
      }
    }
  }
  return sum
}

module.exports = {part1,part2}
