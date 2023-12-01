const part1 = input => input.split('\n').map(
  str => str.split('').filter(Number) // no zeroes, so this works
).reduce(
  (acc,c) => acc + Number(c[0]+c[c.length-1])
,0)

module.exports = { part1 }