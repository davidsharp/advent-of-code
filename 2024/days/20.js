const parse = input => {
  const map = input.split('\n').map(x=>x.split(''))
  const s = map.reduce((coords,row,y) => {
    const foundS = row.indexOf('S')
    if (foundS >= 0) coords = [foundS,y]
    return coords
  },[0,0])
  const path = [s]
  let e = null
  const directions = [[0,-1],[0,1],[-1,0],[1,0]]
  while (!e) {
    const [x,y] = path[path.length-1]
    for (let [dx, dy] of directions) {
      if (map[y + dy]?.[x + dx] == 'E') {
        e = [x+dx,y+dy]
        path.push(e)
      }
      else if (map[y + dy]?.[x + dx] == '.') {
        if (
          !path.find(([_x,_y])=>((_x==x+dx)&&(_y==y+dy)))
        ) {
          path.push([x+dx,y+dy])
        }
      }
    }
  }
  return {s,path,e}
}

const findShortcuts = (path,cheat) => {
  const shortcuts = []
  path.forEach(
    ([x,y], i) => {
      path.forEach(([_x, _y], j) => {
        if (i != j) {
          const shortcutDist = (x>_x?x-_x:_x-x) + (y>_y?y-_y:_y-y)
          if (shortcutDist <= cheat) {
            const diff = (j - i) - shortcutDist
            if(diff>0) shortcuts.push(diff)
          }
        }
      })
    }
  )
  return shortcuts
}

const part1 = input => {
  const {path} = parse(input)
  return findShortcuts(path,2).filter(x=>x>=100).length
}

const part2 = input => {
  const {path} = parse(input)
  return findShortcuts(path,20).filter(x=>x>=100).length
}

module.exports = {part1,part2}
