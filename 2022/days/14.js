const part1 = input => {
  const lines = input.split('\n').map(l=>l.split(' -> ').map(p=>p.split(',').map(Number)))
  const points = new Set()
  let lowest = 0
  lines.forEach(vertices => {
    let frm = vertices.pop()
    let to
    while(vertices.length){
      to = vertices.pop()
      let [x1,y1] = frm
      let [x2,y2] = to
      while(x1!=x2||y1!=y2){
        if(y1>lowest)lowest=y1
        points.add([x1,y1].join(','))
        if(x1!=x2)x1+=(x1>x2?-1:1)
        if(y1!=y2)y1+=(y1>y2?-1:1)
      }
      points.add([x1,y1].join(','))
      if(y1>lowest)lowest=y1
      frm = to
    }
  })

  let sandCount = 0
  let sand = {x:500,y:0}
  while(sand.y<lowest){
    if(!points.has([sand.x,sand.y+1].join(',')))
      sand.y++
    else if(!points.has([sand.x-1,sand.y+1].join(',')))
      {sand.y++;sand.x--}
    else if(!points.has([sand.x+1,sand.y+1].join(',')))
      {sand.y++;sand.x++}
    else {
      points.add([sand.x,sand.y,].join(','))
      sandCount++
      sand = {x:500,y:0}
    }
  }

  return sandCount
}

module.exports = {part1}
