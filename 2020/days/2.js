const parse = input => input.split('\n').map(x=>{
  let [nums, letter, password] = x.split(' ')
  return {
    nums: nums.split('-').map(Number),
    letter: letter.slice(0,-1),
    password
  }
})

const part1 = input => parse(input).reduce((i,{password,letter,nums})=>{
  const count = password.split(letter).length-1
  return count>=nums[0]&&count<=nums[1]?i+1:i
},0)
const part2 = input => parse(input).reduce((i,{password,letter,nums})=>{
  const check1 = password[nums[0]-1]==letter
  const check2 = password[nums[1]-1]==letter
  return i+(check1^check2)
},0)

module.exports = {part1,part2}