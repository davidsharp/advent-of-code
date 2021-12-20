const part1 = input => input.split('\n').map(
  present => {
    const [l,w,h] = present.split('x').map(Number)
    const sides = [l*w,w*h,h*l].sort((a,b)=>a-b)
    // 2*l*w + 2*w*h + 2*h*l
    return [...sides.map(x=>x*2),sides[0]].reduce((a,b)=>a+b)
  }
).reduce((a,b)=>a+b)

module.exports = {part1}
