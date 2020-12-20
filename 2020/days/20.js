const parse = input => {
  return input.split('\n\n').map(tile=>{
    const [id,...rows] = tile.split('\n')
    // calc edges! read *clockwise*
    const top = rows[0]
    const bottom = rows[rows.length-1].split('').reverse().join('')
    const left = rows.map(row=>row.split('')[0]).reverse().join('')
    const right = rows.map(row=>row.split('')[row.length-1]).join('')
    return {
      id:id.match(/Tile ([0-9]+):/i)[1],
      sides:[top,right,bottom,left],
      rows, // split or leave as strings?
      rotation:0,
      flippedX:false,
      flippedY:false
    }
  })
}

const flipRow = row => row.split('').reverse().join('')

const matchSides = tile => {} //

const reverse = str => str.split('').reverse().join('')
const flipX = ([top,right,bottom,left]) => ([
  reverse(top),
  reverse(left),
  reverse(bottom),
  reverse(right)
])
const flipY = ([top,right,bottom,left]) => ([
  reverse(bottom),
  reverse(right),
  reverse(top),
  reverse(left)
])
const getSide = (tile,index) => {console.log(tile)
  // top = 0, right = 1, etc
  //get side based on rotation
  let flippedSides = [...tile.sides]
  if(tile.flippedY){
    let [top,right,bottom,left] = flippedSides
    flippedSides = [
      reverse(bottom),
      reverse(right),
      reverse(top),
      reverse(left)
    ]
  }
  if(tile.flippedX){
    let [top,right,bottom,left] = flippedSides
    flippedSides = [
      reverse(top),
      reverse(left),
      reverse(bottom),
      reverse(right)
    ]
  }
  let side = tile.sides[(4+(index-tile.rotation))%4]
  // so to get the rightmost side of a tile (with correct orientation) getSide(tile,1)
  return side
}

const part1 = input => {
  let tilePool = parse(input)

  console.log(tilePool)

  const imageRows = []
  // while tilePool has tiles?
  // build row until no more matches, pick another square and 
  while(tilePool.length){
    const initialTile = tilePool.pop()
    const imageRow = [initialTile]
    tilePool.forEach((tile,i)=>{
      console.log(i,imageRow[imageRow.length-1])
      const toMatch = reverse(getSide(imageRow[imageRow.length-1],1))
      //^ reversed so r matches our l, sides run counter to each other
      // also try leftmost
      const secondaryToMatch = reverse(getSide(imageRow[0],3))
      let found = null
      let foundSecondary = null
      for(const s of [0,1,2,3]){
        if(tile.sides[s]==toMatch){
          //some rotation calc
          tile.rotation = 3-s // rotate
          found = tile
          break
        }else if(tile.sides[s]==secondaryToMatch){
          tile.rotation = (4+(3-(s+2)))%4
          foundSecondary = tile
          break
        }
      }
      //then try flipped
      if(!found&&!foundSecondary){
        // bleh - make DRY
        const flippedX = flipX(tile.sides)
        for(const s of [0,1,2,3]){
          if(flippedX[s]==toMatch){
            tile.rotation = 3-s
            tile.flippedX = true
            found = tile
            break
          }else if(flippedX[s]==secondaryToMatch){
            tile.rotation = (4+(3-(s+2)))%4
            tile.flippedX = true
            foundSecondary = tile
            break
          }
        }
        if(!found&&!foundSecondary){
          const flippedY = flipY(tile.sides)
          for(const s of [0,1,2,3]){
            if(flippedY[s]==toMatch){
              tile.rotation = 3-s
              tile.flippedY = true
              found = tile
              break
            }else if(flippedY[s]==secondaryToMatch){
              tile.rotation = (4+(3-(s+2)))%4
              tile.flippedY = true
              foundSecondary = tile
              break
            }
          }
        }
      }

      //if found
      if(found)imageRow.push(found)
      if(foundSecondary)imageRow.unshift(foundSecondary)
      if(found||foundSecondary){
        //remove this tile from pool
        tilePool=tilePool.filter(t=>t.id!=tile.id)
      }
    })
    imageRows.push(imageRow)
  }

  console.log(imageRows.map(row=>row.map(tile=>tile.id)))

  // linked list side matches?!
}

/*
 0
3#1
 2
*/

module.exports = {part1}