const part1 = input => {
  let S = null
  const grid = input.split('\n').map((row, y) => {
    const r = row.split('').map(l => /S|E/.test(l) ? l : l.charCodeAt() - 96) //a = 1
    if (!S) {
      const foundS = r.findIndex(x => x == 'S')
      if (foundS > -1) S = [foundS, y]
    }
    return r
  })

  console.log(grid)
  console.log(S)

  return crawl(grid, S)
}

const crawl = (grid, pos, _set = []) => {
  const h = grid.length
  const w = grid[0].length
  let [x, y] = pos
  const set = new Set([..._set])
  set.add(pos.join(','))

  console.log(set.size)

  const current = grid[y][x]=='S'?1:grid[y][x]

  let attempts = []
  //right
  if (x + 1 < w && grid[y][x + 1]) {
    if (grid[y][x + 1] == 'E') { return set }
    else if (grid[y][x + 1] != 'S' && (current + 1) >= grid[y][x + 1]) {
      let a = crawl(grid, [x + 1, y], set)
      if (a) {
        attempts.push(a.map(
          s => (
            s.size + set.size == new Set([...s, ...set]) ? new Set([...s, ...set]) : false
          )
        ))
      }
    }
  }
  //up
  if (y - 1 >= 0 && grid[y - 1][x]) {
    if (current == 26 && grid[y - 1][x] == 'E') { return set }
    else if (grid[y - 1][x] != 'S' && (current + 1) >= grid[y - 1][x]) {
      let a = crawl(grid, [x, y - 1], set)
      if (a) {
        attempts.push(a.map(
          s => (
            s.size + set.size == new Set([...s, ...set]) ? new Set([...s, ...set]) : false
          )
        ))
      }
    }
  }
  //down
  if (y + 1 < h && grid[y + 1][x]) {
    if (current == 26 && grid[y + 1][x] == 'E') { return set }
    else if (grid[y + 1][x] != 'S' && (current + 1) >= grid[y + 1][x]) {
      let a = crawl(grid, [x, y + 1], set)
      if (a) {
        attempts.push(a.map(
          s => (
            s.size + set.size == new Set([...s, ...set]) ? new Set([...s, ...set]) : false
          )
        ))
      }
    }
  }
  //left
  if (x - 1 >= 0 && grid[y][x - 1]) {
    if (current == 26 && grid[y][x - 1] == 'E') { return set }
    else if (grid[y][x - 1] != 'S' && (current + 1) >= grid[y][x - 1]) {
      let a = crawl(grid, [x - 1, y], set)
      if (a) {
        attempts.push(a.map(
          s => (
            s.size + set.size == new Set([...s, ...set]) ? new Set([...s, ...set]) : false
          )
        ))
      }
    }
  }

  attempts = attempts.flat().filter(x => x)
  if (attempts.length == 0) return false
  else return attempts.sort((a,b)=>a.size>b.size?1:-1)[0]
}

module.exports = { part1 }
