const part1 = input => {
  const [times, distances] = input.split('\n').map(line => line.split(/: +/).pop().split(/ +/))
  const races = times.map((time,i)=>({time,distance:distances[i]}))
  return races.reduce((acc,{time,distance},i,a)=>{
    let hold = time - 1 // boat doesn't move if held down the whole time
    let wins = 0
    while(hold>0){
      if((time-hold)*hold>distance)wins++
      hold--
    }
    return wins*acc
  },1)
}

const part2 = input => {
  const [time, distance] = input.split('\n').map(line => line.split(/: +/).pop().split(/ +/).join(''))
  let hold = time - 1 // boat doesn't move if held down the whole time
  let wins = 0
  while(hold>0){
    if((time-hold)*hold>distance)wins++
    hold--
  }
  return wins
}

module.exports = { part1, part2 }
