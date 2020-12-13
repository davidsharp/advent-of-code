const parse = input => {
  const [timestamp,buses] = input.split('\n')
  return {timestamp,buses:(buses||'').split(',').filter(b=>b!='x')}
}
const parse2 = input => {
  const [timestamp,buses] = input.split('\n')
  return (buses||timestamp).split(',').map((bus,i)=>{
    if(bus=='x')return null
    return {id:Number(bus),offset:i}
  }).filter(bus=>bus)
}

const part1 = input => {
  const {timestamp,buses} = parse(input)
  if(buses.length==1) return 'no timestamp';
  const tTable = buses.map(bus=>{
    let circuits=0
    while((bus*circuits)<timestamp){circuits++}
    return {id:bus,earliest:bus*circuits}
  }).sort((a,b)=>a.earliest>b.earliest?1:-1)
  const earliestBus = tTable.shift()
  return (earliestBus.earliest-timestamp) * earliestBus.id
}

const part2 = input => {
  const buses = parse2(input)
  let {start:timestamp} = buses.slice(1).reduce(({start,coprime,buses},bus)=>{
    let timestamp = start+coprime
    let found = false
    buses.push(bus)
    while(!found){
      found = buses.map(bus=>{
        return (timestamp+bus.offset+coprime)%bus.id==0
      }).reduce((a,found)=>a&&found,true)
      timestamp+=coprime
    }
    return ({
      start:timestamp,
      coprime:coprime*bus.id,
      buses
    })
  },{
    start:buses[0].id,
    coprime:buses[0].id,
    buses:[buses[0]]
  })
  return timestamp
}

module.exports = {part1,part2}