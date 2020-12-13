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
  console.log('Buses :::',buses)
  let {start:timestamp,coprime} = buses.slice(1).reduce(({start,coprime,buses},bus)=>{
    let timestamp = start
    let found = false
    buses.push(bus)
    console.log('---\nStarting from :::',start,'multiplyer :::',coprime)
    while(!found){
      console.log('t :::', timestamp)
      found = buses.map(bus=>{
        console.log('- bus :::',bus,'remainder :::',(timestamp+bus.offset+coprime)%bus.id)
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
  console.log(timestamp,coprime)
  return timestamp + coprime
}

/*
    ** Example: 7,13,x,x,59
    **
    ** Previous bus is 7, this bus is 13, with delay +1.
    ** A time T is needed such that:
    **      7x == T
    **     13y == (T + 1)
    **
    ** Performing an iterative search for T on multiples of 7 and checking (T + 1)
    ** eventually reveals that:
    **   (7 * 11) == 77
    **   (13 * 6) == 78
    **
    ** To find further times that match this condition, imagine some value W added to T.
    **    7j == T + W
    **   13k == (T + 1) + W
    ** Substituting:
    **    7j == 7x + W,  and j == x + (W / 7)
    **   13k == 13y + W, and k == y + (W / 13)
    ** For j and k to be integers, since x and y are integers, W must be a multiple of both 7 and 13.
    ** Since all input numbers are conveniently prime, the smallest multiple of both 7 and 13 is (7 * 13).
    ** Thus, W == (7 * 13) == 91.
    **
    **
    ** Next, a time T is needed such that:
    **      7x == T
    **     13y == (T + 1)
    **     59z == (T + 4)
    **
    ** Performing an iterative search from 77, adding multiples of 91, eventually reveals that:
    **    (7 * 50) == 350
    **   (13 * 27) == 351
    **    (59 * 6) == 354
    **
    ** As above, the next T that matches this condition would be 350 + (7 * 13 * 59) == 350 + (5369) == 5719.
    */

module.exports = {part1,part2}