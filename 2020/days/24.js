const parse  = input => {
  return input.split('\n').map(row=>{
    let letters = row.split('')
    const directions = []
    while(letters.length){
      let letter = letters.shift()
      if(/n|s/.test(letter))letter=letter+letters.shift()
      directions.push(letter)
    }
    return directions
  })
}

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
  return blackTiles
}

const part2 = input => {
  const blackTiles = part1(input)
  console.log(blackTiles)
  let bounds = ([...blackTiles]).reduce(([bX,bY],coord)=>{
    const [x,y] = coord.split(',').map(Number)
    if(x<=bX[0])bX[0]=Math.ceil(x-1);
    else if(x>=bX[1])bX[1]=Math.ceil(x+1);
    if(y<=bY[0])bY[0]=y-1;
    else if(y>=bY[1])bY[1]=y+1;
    return [bX,bY]
  },[[0,0],[0,0]])

  for(let day=1;day<=100;day++){
    const prevState = new Set(blackTiles)
    // re-define cube boundaries
    bounds = ([...prevState]).reduce(([bX,bY],coord)=>{
      const [x,y] = coord.split(',').map(Number)
      if(x<=bX[0])bX[0]=Math.ceil(x-2);
      else if(x>=bX[1])bX[1]=Math.ceil(x+2);
      if(y<=bY[0])bY[0]=y-1;
      else if(y>=bY[1])bY[1]=y+1;
      return [bX,bY]
    },[[0,0],[0,0]])
    for(let x=bounds[0][0];x<=bounds[0][1];x++){
      for(let y=bounds[1][0];y<=bounds[1][1];y++){
          //const oddRow = y%2==0
          const offset = (y%2)/2
          let _x=x-offset
          let count = 0;
          count = [
            //e
            prevState.has(`${_x+1},${y}`),
            //w
            prevState.has(`${_x-1},${y}`),
            //ne
            prevState.has(`${_x+.5},${y-1}`),
            //nw
            prevState.has(`${_x-.5},${y-1}`),
            //se
            prevState.has(`${_x+.5},${y+1}`),
            //sw
            prevState.has(`${_x-.5},${y+1}`)
          ].filter(has=>has).length

          // black tile
          if(prevState.has(`${_x},${y}`)){
            if(count==0||count>2){
              blackTiles.delete(`${_x},${y}`)
            }
          }
          // white tile
          else {
            if(count==2){
              blackTiles.add(`${_x},${y}`)
            }
          }
        }
    }
    console.log(day,':',blackTiles.size)
  }
}

module.exports = {part1:input=>part1(input).size,part2}