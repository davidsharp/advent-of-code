const parse = input => input.split('\n')
const findSeat=({offset=0,range},c)=>(
  c=='F'?
    {offset,range:range/2}:
    {offset:offset+(range/2),range:range/2}
)
const findSeats= input => parse(input).map(
  seat=>{
    const rowSeg = seat.slice(0,7).split('')
    const columnSeg = seat.slice(7).split('').map(x=>x=='L'?'F':'B')
    const row = rowSeg.reduce(findSeat,{range:128}).offset
    const column = columnSeg.reduce(findSeat,{range:8}).offset
    return {row,column,id:row*8+column}
})

const part1 = input => {
  const seats = findSeats(input)
  return seats.reduce((h,{id})=>h>id?h:id,0)
}
const part2 = input => {
  const seats = findSeats(input)
  const filledSeats = seats.map(seat=>seat.id).sort((a,b)=>a>b?1:-1)
  return filledSeats.reduce((expected,actual)=>{
    if(expected==actual) return actual+1
    else return expected
  },filledSeats[0])
}

module.exports = {part1,part2}