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

module.exports = {part1}
