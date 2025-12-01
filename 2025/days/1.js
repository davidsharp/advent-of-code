const parse = input => input.split('\n').map((x)=>[x[0],Number(x.slice(1))])

const part1 = input => parse(input).reduce(({count,pos}, [d, x]) => {
  const newPos = ((pos + (x * (d=='L'?-1:1)))) % 100
  return {count:count+(newPos==0?1:0),pos:newPos}
}, {count:0,pos:50}).count

const part2 = input => parse(input).reduce(({count,pos}, [d, x]) => {
  let turns = x
  let newPos = pos
  let newCount = 0
  while (turns-- > 0) {
    newPos = ((newPos + ((d=='L'?-1:1)))) % 100
    if(newPos == 0) newCount++
  }
  return {count:count+newCount,pos:newPos}
}, {count:0,pos:50}).count

module.exports = {part1,part2}
