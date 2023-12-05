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
  //console.log(seeds,maps)
  return seeds.map(seed => {
    let val = seed
    //console.log('seed: ',seed)
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
      //console.log({found,line,map:map[line],val})
    }
    return val
  }).reduce((a,b)=>Math.min(a,b))
}

module.exports = { part1 }
