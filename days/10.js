const parse = input => input.split('\n').map(Number)

const part1 = input => {
  const adapters = parse(input).sort((a,b)=>a>b?1:-1)
  let ones = 0
  let threes = 1 // device's built-in joltage adapter
  adapters.forEach((c,i,a)=>{
    const joltageDif = c-(a[i-1]||0)
    if(joltageDif==1)ones++
    if(joltageDif==3)threes++
  })
  return ones*threes
}
const part2 = input => {}

module.exports = {part1, part2}