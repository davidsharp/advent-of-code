const part1 = input => {
  const lines = input.split('\n').map(l=>l.split(' -> ').map(p=>p.split(',').map(Number)))
  const points = new Set()
  lines.forEach(vertices => {
    let frm = vertices.pop()
    let to
    while(vertices.length){
      to = vertices.pop()
      let [x1,y1] = frm
      let [x2,y2] = to
      while(x1!=x2||y1!=y2){
        points.add([x1,y1].join(','))
        if(x1!=x2)x1+=(x1>x2?-1:1)
        if(y1!=y2)y1+=(y1>y2?-1:1)
      }
      points.add([x1,y1].join(','))
      frm = to
    }
  })
  return points
}

module.exports = {part1}
