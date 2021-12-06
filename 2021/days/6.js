const runSimulation = (input,days) => {
  let timerStates = (new Array(9)).fill(0)
  input.split(',').forEach(f=>timerStates[f]++)
  for(let i = 0;i<days;i++){
    const [zeros,...ticked] = timerStates
    // reset zeros
    ticked[6]+=zeros
    // spawn new eights
    ticked[8]=zeros
    timerStates = ticked
  }
  return timerStates.reduce((acc,c)=>acc+c,0)
}

const part1 = input => runSimulation(input,80)
const part2 = input => runSimulation(input,256)

module.exports = {part1, part2}
