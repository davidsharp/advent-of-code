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
  const seatPlan = (new Array(128)).fill([]).map(row=>(new Array(8)).fill(null))
  seats.forEach(
    ({row,column,id})=>seatPlan[row][column]=id
  )
  //console.log(seatPlan.map((row,i)=>({i,row})))
  return 'got kinda lucky with this one tbh'
}

module.exports = {part1,part2}