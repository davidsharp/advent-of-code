const part1 = input => {
  const map = input.split('\n').map(x=>x.split('').map(Number))
  const trailheads = []
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] == 0) trailheads.push([x,y])
    }
  }
  const crawl = (h,x,y) => {
    let peaks = new Set()
    const directions = [[0,-1],[0,1],[-1,0],[1,0]]
    for (let [dx, dy] of directions) {
      const point = map[y+dy]?.[x+dx]
      if(point && point == h+1){
        if (h+1 == 9) {
          peaks.add(`${x+dx},${y+dy}`)
        }
        // requires node 22
        else peaks = peaks.union(crawl(h+1,x+dx,y+dy))
      }
    }
    return peaks
  }
  return trailheads.reduce((sum,[x,y]) => {
    const peaks = crawl(0,x,y)
    return sum + peaks.size
  },0)
}

module.exports = {part1}
