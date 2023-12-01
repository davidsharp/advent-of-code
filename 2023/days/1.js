const part1 = input => input.split('\n').map(
  str => str.split('').filter(Number) // no zeroes, so this works
).reduce(
  (acc,c) => acc + Number(c[0]+c[c.length-1])
,0)

const nums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].map(x=>new RegExp(x, "g"))
const replace = str => {
  let new_str = str
  nums.forEach((c,i)=>{new_str=new_str.replace(c,i+1)})
  return new_str
}
const part2 = input => input.split('\n').map(
  str => replace(str).split('').filter(Number) // no zeroes, so this works
)/*.reduce(
  (acc,c) => acc + Number(c[0]+c[c.length-1])
,0)*/

module.exports = { part1, part2 }