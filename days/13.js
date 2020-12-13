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
  let timestamp = buses[0].id
  let result = null
  //console.log(buses)
  while(result==null){
    const found = buses.map(bus=>{
      //if(timestamp == 1068781) console.log(bus, timestamp+bus.offset, (timestamp+bus.offset)%bus.id)
      return (timestamp+bus.offset)%bus.id==0
    }).reduce((a,found)=>a&&found,true)
    //if(timestamp == 1068781)console.log(found)
    if(found)result=timestamp
    else timestamp+=buses[0].id
  }
  return timestamp
}

module.exports = {part1,part2}