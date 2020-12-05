const parse = input => input.split('\n')
const findSeat=({offset=0,range},c)=>(
  c=='F'?
    {offset,range:range/2}:
    {offset:offset+(range/2),range:range/2}
)

const part1 = input => {
  const seats = parse(input).map(
    seat=>{
      const rowSeg = seat.slice(0,7).split('')
      const columnSeg = seat.slice(7).split('').map(x=>x=='L'?'F':'B')
      const row = rowSeg.reduce(findSeat,{range:128}).offset
      const column = columnSeg.reduce(findSeat,{range:8}).offset
      return [row,column]
  })
  return seats.reduce((h,[row,column])=>{
    const id = row*8+column
    return h>id?h:id
  },0)
}
const part2 = input => {}

module.exports = {part1,part2}