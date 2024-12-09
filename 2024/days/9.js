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

const part2 = input => {
  const dMap = input.split('').map(Number)
  const disk = []
  let highestId = 0
  dMap.forEach((blocks, i) => {
    // file
    if (i % 2 == 0) {
      const id = i/2
      disk.push({id,blocks})
      if(id>highestId) highestId = id
    }
    // space
    else {
      disk.push({id:'space',blocks})
    }
  })

  for (let i = highestId; i > 0; i--) {
    const fileIdx = disk.findIndex(({id})=>id==i)
    const file = disk[fileIdx]
    const freeSpace = disk.findIndex(({ id, blocks }) => (
      id == 'space' && blocks >=file.blocks
    ))
    if (freeSpace > -1 && freeSpace < fileIdx) {
      disk.splice(fileIdx, 1, {id:'space',blocks:file.blocks})
      const toAdd = [file]
      if (file.blocks < disk[freeSpace].blocks) toAdd.push({id:'space',blocks:disk[freeSpace].blocks-file.blocks})
      disk.splice(freeSpace,1,...toAdd)
    }
    // rejoin spaces?
    /*disk.reduce(((newDisk, fileOrSpace) => {
      if (fileOrSpace.id == 'space' && newDisk[newDisk.length - 1]?.id == 'space') {
        newDisk[newDisk.length - 1].blocks += fileOrSpace.blocks
      } else {
        newDisk.push(fileOrSpace)
      }
      return newDisk
      }),[])*/
  }
  //console.log(disk.map(({id,blocks})=>`${id},${blocks}`))

  return disk.reduce(({sum,blockOffset}, file) => {
    if (file.id != 'space') {
      let b = file.blocks
      while (b-->0) {
        sum += ((blockOffset+b) * file.id)
      }
    }
    blockOffset += file.blocks
    return {sum,blockOffset}
  }, {sum:0,blockOffset:0}).sum
}

module.exports = {part1, part2}
