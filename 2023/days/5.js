const part1 = input => {
  let [seeds, ...maps] = input.split('\n\n')
  seeds = seeds.split(': ').pop().split(' ').map(Number)
  maps = maps.map(m => m.split(': ').pop().split('\n').map(
      line => {
        const [dest_start,source_start,length] = line.split(' ').map(Number)
        return {dest_start,source_start,length}
      }
    )
  )
  //console.log({seeds,maps})
  return seeds.map(seed => {
    let found = false
    let line = 0
    let map = maps[0]
    while(!found && line<map.length){
      const {source_start,length} = map[line]
      if(seed >= source_start && seed < (source_start+length))
        found = true
      else
        line++
    }
    if(!found) return seed
    else {
      const {dest_start,source_start} = map[line]
      return (seed - source_start) + dest_start
    }
  })
}

module.exports = { part1 }
