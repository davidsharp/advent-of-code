let easystarjs = require('easystarjs')

const part1 = async input => {
  const gridSize = 71
  const coords = input.split('\n').slice(0,1024).map(x=>x.split(',').map(Number))
  let grid = (new Array(gridSize)).fill(0).map(()=>(new Array(gridSize)).fill(0))
  coords.forEach(([x,y])=>grid[x][y]=1)
  let easystar = new easystarjs.js()
  easystar.setGrid(grid)
  easystar.setAcceptableTiles([0])
  let foundPath = await (new Promise(
    (resolve, reject) => {
      easystar.findPath(0, 0, gridSize-1, gridSize-1, function (path) {
        if (path === null) {
          reject()
        } else {
          resolve(path)
        }
      })
      easystar.calculate()
    }
  ))
  return foundPath?.length-1
}

module.exports = {part1}