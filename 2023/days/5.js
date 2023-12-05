const part1 = input => {
  let [seeds, ...maps] = input.split('\n\n')
  seeds = seeds.split(': ').pop().split(' ').map(Number)
  maps = maps.map(m => m.split(': ').pop().split('\n').slice(1).map(
      line => {
        const [dest_start,source_start,length] = line.split(' ').map(Number)
        return {dest_start,source_start,length}
      }
    )
  )
  return seeds.map(seed => mapSeed(seed,maps)).reduce((a,b)=>Math.min(a,b))
}
const mapSeed = (seed,maps) => {
  let val = seed
  for(const map of maps){
    let found = false
    let line = 0
    while(!found && line<map.length){
      const {source_start,length} = map[line]
      if(val >= source_start && val < (source_start+length))
        found = true
      else
        line++
    }
    if(found) {
      const {dest_start,source_start} = map[line]
      val = (val - source_start) + dest_start
    }
  }
  return val
}
const part2 = input => {
  let [seeds, ...maps] = input.split('\n\n')
  seeds = seeds.split(': ').pop().split(' ').map(Number)
  maps = maps.map(m => m.split(': ').pop().split('\n').slice(1).map(
      line => {
        const [dest_start,source_start,length] = line.split(' ').map(Number)
        return {dest_start,source_start,length}
      }
    )
  )
  let seed_idx = 0
  let lowest = Infinity
  while(seed_idx<seeds.length){
    const start = seeds[seed_idx]
    const range = seeds[seed_idx+1]
    let seed = start
    while(seed < (start+range)){
      lowest = Math.min(lowest,mapSeed(seed,maps))
      seed++
    }
    seed_idx+=2
  }
  return lowest
}

module.exports = { part1, part2 }
