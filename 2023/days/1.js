const part1 = input => input.split('\n').map(
  str => str.split('').filter(Number) // no zeroes, so this works
).reduce(
  (acc,c) => acc + Number(c[0]+c[c.length-1])
,0)

const nums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].map(x=>new RegExp(x, "g"))
const replace = str => {
  const new_str = str
  const temp = []
  nums.forEach((re,i)=>{
    const idx = new_str.search(re)
    if(idx>=0) temp.push([idx,i+1])
  })
  const new_nums = new_str.split('')
  temp.forEach(([idx,val])=> new_nums[idx] = String(val))
  return new_nums.filter(Number)
}
const part2 = input => input.split('\n').map(
  str => replace(str) // no zeroes, so this works
).reduce(
  (acc,c) => acc + Number(c[0]+c[c.length-1])
,0)

module.exports = { part1, part2 }