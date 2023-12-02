const p1_limit = {red: 12, green: 13, blue: 14}
const part1 = input => input.split('\n').map(
  (line,i) => {
    const id = i + 1
    const rounds = line.split(': ').pop().split('; ').map(
      round => round.split(', ').reduce((obj,draw)=>{
        const [count, colour] = draw.split(' ')
        obj[colour] = Number(count)
        return obj
      },{red:0,green:0,blue:0})
    )
    return rounds.reduce((possible,round)=>{
      return (
        possible &&
        round.red <= p1_limit.red &&
        round.green <= p1_limit.green &&
        round.blue <= p1_limit.blue
      )
    },true) ? id : 0
  }
).reduce((a,b)=>a+b)

const part2 = input => input.split('\n').map(
  (line,i) => {
    const id = i + 1
    const rounds = line.split(': ').pop().split('; ').map(
      round => round.split(', ').reduce((obj,draw)=>{
        const [count, colour] = draw.split(' ')
        obj[colour] = Number(count)
        return obj
      },{red:0,green:0,blue:0})
    )
    return rounds.reduce((current,round)=>{
      return {
        red: Math.max(current.red,round.red),
        green: Math.max(current.green,round.green),
        blue: Math.max(current.blue,round.blue),
      }
    },{red:0,green:0,blue:0})
  }
).reduce((acc,{red,green,blue})=>(acc+(red*green*blue)),0)

module.exports = { part1, part2 }