const part1 = input => {
  let lowX = 0
  let highX = 0
  const sensors = input.split('\n').map(
    line => {
      [sx,sy,bx,by] = [...line.matchAll(/-?[0-9]+/g)].map(x=>Number(x[0]))
      const dist = mDist(sx,sy,bx,by)
      if(bx<lowX)lowX = bx
      if(bx>highX)highX = bx
      if(sx-dist<lowX)lowX = sx-dist
      if(sx+dist>highX)highX = sx+dist
      return {
        x: sx, y: sy, beacon:[bx,by], dist
      }
    }
  )

  const row = 2_000_000
  let x = lowX
  let impCount = 0
  while(x<=highX){
    let b = false // found beacon
    let r = false // reached by sensor
    sensors.forEach(
      s => {
        if(s.beacon[0]==x&&s.beacon[1]==row) b = true
        else if(s.dist>=mDist(s.x,s.y,x,row)) r = true
      }
    )
    if(r && !b) impCount++
    x++
  }

  return impCount
}

const part2 = input => {
  let lowX = 0
  let highX = 4_000_000
  const sensors = input.split('\n').map(
    line => {
      [sx,sy,bx,by] = [...line.matchAll(/-?[0-9]+/g)].map(x=>Number(x[0]))
      const dist = mDist(sx,sy,bx,by)
      return {
        x: sx, y: sy, beacon:[bx,by], dist
      }
    }
  )

  let y = 0
  let x = lowX
  let found = null
  while(y<=highX && !found){
    while(x<=highX && !found){
      let b = false // found beacon
      let r = false // reached by sensor
      sensors.forEach(
        s => {
         if(s.beacon[0]==x&&s.beacon[1]==y) b = true
         else if(s.dist>=mDist(s.x+1,s.y+1,x+1,y+1)) r = true
       }
      )
      if(!r && !b) found=[x,y]
      x++
    }
    x=0
    y++
  }

  return (found[0]*4_000_000)+found[1]
}

const mDist = (x1,y1,x2,y2) => Math.abs(x1-x2) + Math.abs(y1-y2)

module.exports = {part1,part2}
