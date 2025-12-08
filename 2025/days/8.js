const parse = input => input.split('\n').map(x=>x.split(',').map(Number))
const d = (a, b) => Math.sqrt(
  ((a[0]-b[0])**2) +
  ((a[1]-b[1])**2) +
  ((a[2]-b[2])**2)
)

const part1 = input => {
  const jBoxes = parse(input)
  const max_con = 10
  let connex = []
  for (let i = 0; i < jBoxes.length; i++) {
    const c = jBoxes[i]
    for (let j = i + 1; j < jBoxes.length ;j++) {
      const cc = jBoxes[j]
      //console.log(i*j,d(c,cc))
      const dist = d(c,cc)
      if (connex.length < max_con) connex.push([dist, c, cc])
      else {
        if(dist < connex[connex.length-1][0]) {
          connex.push([dist,c,cc])
          connex.sort((a,b)=>a[0]-b[0])
          connex.pop()
        }
      }
    }
  }
  return connex
}

module.exports = {part1}
