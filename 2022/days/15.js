const part1 = input => {
  const sensors = input.split('\n').map(
    line => {
      [sx,sy,bx,by] = [...line.matchAll(/-?[0-9]+/g)].map(x=>Number(x[0]))
      return {
        x: sx, y: sy, beacon:[bx,by], dist: mDist(sx,sy,bx,by)
      }
    }
  )

  console.log(sensors)
}

const mDist = (x1,y1,x2,y2) => Math.abs(x1-x2) + Math.abs(y1-y2)

module.exports = {part1}
