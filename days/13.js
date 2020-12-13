const parse = input => {
  const [timestamp,buses] = input.split('\n')
  return {timestamp,buses:buses.split(',').filter(b=>b!='x')}
}

const part1 = input => {
  const {timestamp,buses} = parse(input)
  const tTable = buses.map(bus=>{
    let circuits=0
    while((bus*circuits)<timestamp){circuits++}
    return {id:bus,earliest:bus*circuits}
  }).sort((a,b)=>a.earliest>b.earliest?1:-1)
  const earliestBus = tTable.shift()
  return (earliestBus.earliest-timestamp) * earliestBus.id
}

module.exports = {part1}