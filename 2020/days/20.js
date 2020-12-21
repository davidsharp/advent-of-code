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
      matches:[null,null,null,null],
      rows, // split or leave as strings?
      rotation:0,
      flippedX:false,
      flippedY:false
    }
  })
}

const matchTiles = tiles => {
  tiles.forEach(tileA=>{
    tiles.forEach(tileB=>{
     if(tileA==tileB)return;
     for(const sA of [0,1,2,3]){
       if(tileA.matches[sA])continue;
       for(const sB of [0,1,2,3]){
         if(tileA.sides[sA]==tileB.sides[sB]){
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

// attempt 2! this time match all
const part1 = input => {
  let tiles = parse(input)
  tiles = matchTiles(tiles)
  const corners = tiles.filter(tile=>tile.matches.filter(x=>x).length==2)
  return corners.map(corner=>corner.id).reduce((a,b)=>a*b,1)
}

const part2 = input => {
  let tiles = matchTiles(parse(input))
  const corners = tiles.filter(tile=>tile.matches.filter(x=>x).length==2)
  const initialTile = corners.find(corner=>{
    const [top,,,left] = corner.matches
    return top==null&&left==null // "top left" corner
  })
  console.log(initialTile)
  tiles=tiles.reduce((o,tile)=>({...o,[tile.id]:tile}),{})
  let tile = initialTile
  let next = tiles[tile.matches[2]]
  let rows = []
  while(next){
    let rot = 0
    while(
      // (0+rot)%4, as looking for top
      !(tile.sides[2]!=next.sides[rot%4] ||
      tile.sides[2]!=reverse(next.sides[rot%4]))
    ){
      rot=(rot+1)%4
    }
    next.rotation=rot%4
    if(tile.sides[2]==(next.sides[rot%4])){
      // is backwards, so flipX
      next.flippedX=!tile.flippedX
    }

    rows.push([tile])
    tile = next
    next = tiles[getSideId(next,2)]
    if(!next)rows.push([tile]) //last row, off-by-one fix
  }
  rows=rows.map(row=>{
    let tile = row[0]
    let next = tiles[getSideId(tile,1)]
    while(next){
      let rot = 0
      while(
        // (3+rot)%4, as looking for left
        !(tile.sides[1]!=next.sides[(3+rot)%4] ||
        tile.sides[1]!=reverse(next.sides[(3+rot)%4]))
      ){
        rot=(rot+1)%4
      }
      next.rotation=rot%4
      if(tile.sides[1]==(next.sides[(3+rot)%4])){
        // is upside down, so flipY
        next.flippedY=!tile.flippedY
      }
  
      row.push(tile)
      tile = next
      next = tiles[getSideId(next,1)]
      if(!next)row.push(tile) //last row, off-by-one fix
    }
    return row
  })
  console.log(rows)
}

const reverse = str => str.split('').reverse().join('')
const arrayRotCw = (arr,times=1) => {
  let temp = [...arr]
  let count = 0
  while(count<times){
    temp = [temp.pop(),...temp]
    count++
  }
  return temp
}
const arrayRotAcw = (arr,times=1) => {
  let temp = [...arr]
  let count = 0
  while(count<times){
    let [head,...rest] = arr
    temp = [...rest,head]
    count++
  }
  return temp
}

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
const getSide = (tile,index) => {
  // top = 0, right = 1, etc
  //get side based on rotation
  let sides = [...tile.sides]
  if(tile.flippedY){
    let [top,right,bottom,left] = sides
    sides = [
      reverse(bottom),
      reverse(right),
      reverse(top),
      reverse(left)
    ]
  }
  if(tile.flippedX){
    let [top,right,bottom,left] = sides
    sides = [
      reverse(top),
      reverse(left),
      reverse(bottom),
      reverse(right)
    ]
  }
  let side = sides[(4+(index-tile.rotation))%4]
  // so to get the rightmost side of a tile (with correct orientation) getSide(tile,1)
  return side
}
const getSideId = (tile,index) => {
  // rotate first, unlike previous solution
  // top = 0, right = 1, etc
  //get side based on rotation
  let matches = arrayRotCw(tile.matches,tile.rotation)
  if(tile.flippedY){
    let [top,right,bottom,left] = matches
    matches = [
      bottom,
      right,
      top,
      left
    ]
  }
  if(tile.flippedX){
    let [top,right,bottom,left] = matches
    matches = [
      top,
      left,
      bottom,
      right
    ]
  }
  let match = matches[index]//[(4+(index-tile.rotation))%4]
  // so to get the rightmost side of a tile (with correct orientation) getSide(tile,1)
  console.log('match:::',index,match)
  return match
}

const xpart1 = input => {
  let tilePool = parse(input)

  console.log(tilePool.length)

  const imageRows = []
  // while tilePool has tiles?
  // build row until no more matches, pick another square and 
  while(tilePool.length){
    const initialTile = tilePool.pop()
    const imageRow = [initialTile]
    let noneFound = false
    while(!noneFound){
      noneFound = true
      tilePool.forEach((tile,i)=>{
      //console.log(tile.id,imageRow.map(tile=>tile.id))
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
        noneFound=false
        //console.log('found match',tile.id)
      }//else{console.log('none found',tile.id)}
        //console.log(noneFound)
      })
    }
    imageRows.push(imageRow)
  }

  console.log(imageRows)

  //same again but for rows
  let rowPool = [...imageRows]
  let image = null
  const initialRow = rowPool.shift()
  image = [initialRow]
  while(rowPool.length){
    //console.log(rowPool.length)
    rowPool.forEach((row)=>{
      // match for a row below
      const toMatch = reverse(getRowBottom(image[image.length-1]))
      // and match for one above
      const secondaryToMatch = reverse(getRowTop(image[0]))

      let found = null
      let foundSecondary = null

      //console.log(row)
      let top = getRowTop(row)
      let bottom = getRowBottom(row)

      //checking it can go on the bottom
      if(top==toMatch){
        //top of this row fits on bottom of image
          found = row
      } else if(reverse(top)==toMatch){
        //top fits, but reversed
          found = rowFlipX(row)
      } else if(bottom==toMatch){
        //bottom fits to bottom of image
          found = rowRotate180(row)
      } else if(reverse(bottom)==toMatch){
        //bottom fits, but reversed
          found = rowFlipY(row)
      }
      // checking if it can go on top
      else if(bottom==secondaryToMatch){
        // bottom of this row fits on top of image
          foundSecondary = row
      } else if(reverse(bottom)==secondaryToMatch){
        // bottom fits, but reversed
          foundSecondary = rowFlipX(row)
      } else if(top==secondaryToMatch){
        // top fits to top of image
          foundSecondary = rowRotate180(row)
      } else if(reverse(top)==secondaryToMatch){
        // top fits, but reversed
          foundSecondary = rowFlipY(row)
      }

      //if found
      if(found)image.push(found)
      if(foundSecondary)image.unshift(foundSecondary)
      if(found||foundSecondary){
        //remove this row from pool
        rowPool=rowPool.filter(_row=>_row.findIndex(tile=>row[0].id==tile.id)==-1)
      }
      })
  }

  //console.log(image.map(row=>row.map(tile=>tile.id)))

  const corners = [
    image[0][0],image[0][image[0].length-1],
    image[image.length-1][0],image[image.length-1][image[0].length-1],
  ].map(tile=>tile.id)

  console.log(corners)
  return corners.reduce((a,b)=>a*b,1)
}

const getRowTop = row => row.map(tile=>getSide(tile,0)).join('')
const getRowBottom = row => [...row].reverse().map(tile=>getSide(tile,2)).join('')
const rowRotate180 = row => [...row].reverse().map(tile=>({rotation:(tile.rotation+2)%4,...tile}))
const rowFlipX = row => [...row].reverse().map(tile=>({flippedX:!tile.flippedX,...tile}))
const rowFlipY = row => row.map(tile=>({flippedY:!tile.flippedY,...tile}))

/*
 0
3#1
 2
*/

module.exports = {part1,part2}