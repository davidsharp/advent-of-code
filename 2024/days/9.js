const part1 = input => {
  const dMap = input.split('').map(Number)
  const disk = []
  dMap.forEach((blocks, i) => {
    // file
    if (i % 2 == 0) {
      const id = i/2
      disk.push(...Array(blocks).fill(id))
    }
    // space
    else {
      disk.push(...Array(blocks).fill('.'))
    }
  })
  let freeSpace = dMap[0]
  while (freeSpace > -1) {
    const block = disk.pop()
    if(block != '.') disk[freeSpace] = block
    freeSpace = disk.indexOf('.')
  }
  //console.log(disk.join('|'))

  return disk.reduce((sum, id, block) => (
    sum + (id * block)
  ),0)
}

module.exports = {part1}
