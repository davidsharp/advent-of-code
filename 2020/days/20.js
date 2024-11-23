const parse = input => {
  return input.split('\n\n').map(tile=>{
    const [id,...rows] = tile.split('\n')
    return new Tile(id.match(/Tile ([0-9]+):/i)[1],rows)
  })
}

class Tile {
  rotation=0
  flippedX=false
  flippedY=false
  matches=[null,null,null,null]
  constructor(id,rows) {
    this.id = id
    // calc edges! read *clockwise*
    const top = rows[0]
    const bottom = rows[rows.length-1].split('').reverse().join('')
    const left = rows.map(row=>row.split('')[0]).reverse().join('')
    const right = rows.map(row=>row.split('')[row.length-1]).join('')
    this.sides = [top,right,bottom,left]
    // just the inside, ignoring edges
    this.rows = rows.slice(1,-1).map(row=>row.slice(1,-1))
  }
  rotate(by=1) {
    const temp = this.matches.shift()
    this.matches.push(temp)
    this.rotation += by
    this.rotation %= 4
  }
  get left() {return this.sides[3]}
  get right() {return this.sides[1]}
  get top() {return this.sides[0]}
  get bottom() {return this.sides[2]}
}

const matchTiles = tiles => {
  tiles.forEach(tileA=>{
    tiles.forEach(tileB=>{
     if(tileA==tileB)return;
     for(const sA of [0,1,2,3]){
       if(tileA.matches[sA])continue;
       for(const sB of [0,1,2,3]){
         if(tileA.sides[sA]==tileB.sides[sB] ){
           tileA.matches[sA]=tileB.id
           tileB.matches[sB]=tileA.id
           break
         }
         else if(tileA.sides[sA]==reverse(tileB.sides[sB])){
           tileA.matches[sA]=tileB.id
           tileB.matches[sB]=tileA.id
         }}
     }
    })
  })

  return tiles
}

const reverse = str => str.split('').reverse().join('')

// attempt 3
const part1 = input => {
  let tiles = parse(input)
  tiles = matchTiles(tiles)
  const corners = tiles.filter(tile=>tile.matches.filter(x=>x).length==2)
  return corners.map(corner=>corner.id).reduce((a,b)=>a*b,1)
}

const part2 = input => {
  let tiles = parse(input)
  tiles = matchTiles(tiles)
  const firstCorner = tiles.find(tile=>tile.matches.filter(x=>x).length==2)
  // rotate to be top-left
  while (firstCorner.top || firstCorner.left) {
    firstCorner.rotate()
  }
  let [x, y] = [0, 0]
  //create grid
  let grid = [[]]
  grid[y][x] = firstCorner
  let rowAvailable = true
  let columnAvailable = true
  while (rowAvailable) {
    x = 0
    while (columnAvailable) {
      const current = grid[y][x]
      // get piece to the right
      const nextId = current.matches[1]
      if (!nextId) { columnAvailable = false; break;}
      const next = tiles[nextId]
      while(current.id != next.left){
        next.rotate()
      }
      x++
    }
    rowAvailable = false
  }


  //render grid - todo

  return grid
}

module.exports = { part1, part2 }
