module.exports = {
  part1: _=>console.log('part 1 and 2 have the same output, see below for output'),
  part2: data=>{
    console.log('probably best to pipe this into less')
    const stars = data.split('\n').map(
      s=>s.match(/-?\d*,( )+-?\d*/g).map(v=>v.split(',').map(_=>parseInt(_)))
    ) // array of stars, with format [position],[velocity]
    const print = (positions, dimensions, seconds) => {
      const field = (new Array(dimensions[1])).fill(null).map(_=>(new Array(dimensions[0])).fill('.'))
      positions.forEach(c=>{
        if(field[c[1]-1]&&field[c[1]-1][c[0]-1])
          field[c[1]-1][c[0]-1]='#'
      })
      return '\n~~~ second: '+seconds+' vvv\n'+field.map(c=>c.join('')).join('\n')
    }
    const positionAtSecond = (star, second) => (
      [
        star[0][0]+(star[1][0]*second),
        star[0][1]+(star[1][1]*second)
      ]
    )
    const calcDimensions = (stars, second) => stars.reduce((a,_b)=>{
      const b = positionAtSecond(_b,second)
      return !a?[b[0],b[0],b[1],b[1]]:(
      //[x1,x2,y1,y2]
      [
        Math.min(a[0],b[0]),
        Math.max(a[1],b[0]),
        Math.min(a[2],b[1]),
        Math.max(a[3],b[1])
      ]
    )},null)
    const dim = calcDimensions(stars, 0)
    let width=dim[1]-dim[0]; let height=dim[3]-dim[2];
    let offsetX=-dim[0]; let offsetY=-dim[2];
    let bigString=''; let seconds=0;
    while(width>=stars.length||height>=stars.length){
      let dim = calcDimensions(stars,seconds++)
      width=dim[1]-dim[0]; height=dim[3]-dim[2];
      offsetX=-dim[0]; offsetY=-dim[2];
    }
    while(width<=stars.length&&height<=stars.length){
      let dim = calcDimensions(stars,seconds++)
      width=dim[1]-dim[0]; height=dim[3]-dim[2];
      offsetX=-dim[0]; offsetY=-dim[2];
      const starsNow = stars.map(s=>positionAtSecond(s,seconds))
      bigString=bigString+print(starsNow.map(s=>[s[0]+offsetX,s[1]+offsetY]),[width,height],seconds)
    }
    return bigString
  }
}