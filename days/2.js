const part1 = input => input.split('\n').map(x=>{
  let [nums, letter, password] = x.split(' ')
  return {
    nums: nums.split('-').map(Number),
    letter: letter.slice(0,-1),
    password
  }
}).reduce((i,{password,letter,nums})=>{
  const count = password.split(letter).length-1
  return count>=nums[0]&&count<=nums[1]?i+1:i
},0)
const part2 = input => {}

module.exports = {part1,part2}