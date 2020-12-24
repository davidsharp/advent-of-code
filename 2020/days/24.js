const parse  = input => {
  return input.split('\n').map(row=>{
    let letters = row.split('')
    const directions = []
    while(letters.length){
      let letter = letters.shift()
      if(/n|s/.test(letter))letter=letter+letters.shift()
      directions.push(letter)
    }
    //console.log(directions)
    return directions
  })
}

/*
esew
nwwswee
*/

const part1 = input => {
  const tileDirections = parse(input)
  const blackTiles = new Set()
  tileDirections.forEach(directions=>{
    let [x,y] = [0,0]
    directions.forEach(direction=>{
      switch(direction){
        case 'nw':
          x-=.5
          y--
          break;
        case 'ne':
          x+=.5
          y--
          break;
        case 'w':
          x--
          break;
        case 'e':
          x++
          break;
        case 'sw':
          x-=.5
          y++
          break;
        case 'se':
          x+=.5
          y++
          break;
        default:
          console.log(`whoops, no direction: ${direction}`)
      }
    })
    let loc = `${x},${y}`
    if(blackTiles.has(loc))blackTiles.delete(loc)
    else blackTiles.add(loc)
  })
  return blackTiles.size
}

module.exports = {part1}