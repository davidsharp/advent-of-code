const part1 = input => {
  const h = [0,0]
  const t = [0,0]

  const visited = new Set(['0,0'])

  const move = dir => {
    // 0 = x, 1 = y
    const axis = /R|L/.test(dir)?0:1
    const mag = /U|L/.test(dir)?-1:1
    h[axis]+=mag
    console.log('h: ',h)
  }

  const follow = () => {
    const xDiff = Math.abs(h[0]-t[0])
    const yDiff = Math.abs(h[1]-t[1])

    // close enough, don't move
    if(xDiff + yDiff <= 1 || (xDiff == 1 && yDiff == 1)) return;
    // horizontal / vertical
    if(xDiff == 0 || yDiff == 0){
      if(h[0]>t[0])t[0]++
      else if(h[1]>t[1])t[1]++
      else if(h[0]<t[0])t[0]--
      else t[1]--
    }
    // else diagonal
    else {
      const _t = [...t]
      if(h[0]>t[0])_t[0]++
      if(h[1]>t[1])_t[1]++
      if(h[0]<t[0])_t[0]--
      if(h[1]<t[1])_t[1]--
      t[0] = _t[0]
      t[1] = _t[1]
    }

    console.log('t: ',t)
    visited.add(t.join(','))
  }

  input.split('\n').forEach(
    inst => {
      let [dir,by] = inst.split(' ')
      while(by-->0){
        console.log(dir,by+1)
        move(dir)
        follow()
      }
    }
  )

  return visited.size
}

const part2 = input => {
  const h = [0,0]
  const knots = Array(9).fill(0).map(_=>[0,0])

  const visited = new Set(['0,0'])

  const move = dir => {
    // 0 = x, 1 = y
    const axis = /R|L/.test(dir)?0:1
    const mag = /U|L/.test(dir)?-1:1
    h[axis]+=mag
    console.log('h: ',h)
  }

  const follow = (h,t) => {
    const xDiff = Math.abs(h[0]-t[0])
    const yDiff = Math.abs(h[1]-t[1])

    // close enough, don't move
    if(xDiff + yDiff <= 1 || (xDiff == 1 && yDiff == 1)) return;
    // horizontal / vertical
    if(xDiff == 0 || yDiff == 0){
      if(h[0]>t[0])t[0]++
      else if(h[1]>t[1])t[1]++
      else if(h[0]<t[0])t[0]--
      else t[1]--
    }
    // else diagonal
    else {
      const _t = [...t]
      if(h[0]>t[0])_t[0]++
      if(h[1]>t[1])_t[1]++
      if(h[0]<t[0])_t[0]--
      if(h[1]<t[1])_t[1]--
      t[0] = _t[0]
      t[1] = _t[1]
    }

    console.log('t: ',t)
  }

  input.split('\n').forEach(
    inst => {
      let [dir,by] = inst.split(' ')
      while(by-->0){
        console.log(dir,by+1)
        move(dir)
        knots.forEach(
          (x,i)=>follow(knots[i-1]||h,x)
        )
        visited.add(knots[8].join(','))
      }
    }
  )

  return visited.size
}

module.exports = {part1,part2}
