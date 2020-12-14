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
const part2 = input => {
  const _adapters = parse(input).sort((a,b)=>a>b?1:-1)
  const device = _adapters[_adapters.length-1]+3
  const adapters = [0,..._adapters,device]
  const set = new Set(adapters)
  let possibilities = 1
  const possCounter = [1]
  adapters.forEach(
    (a,i)=>{
      /*let poss = 0
      if(set.has(a+1))poss++
      if(set.has(a+2))poss++
      if(set.has(a+3))poss++
      possibilities*=poss
      console.log(a,possibilities,poss)*/
      /*let poss = [
        set.has(a-1),
        set.has(a-2),
        set.has(a-3)
      ].filter(x=>x).length*/
      let j = i + 1
      while(adapters[j] <= a + 3) {
        possCounter[j] = (possCounter[j] || 0) + possCounter[i];
        j++;
      }
    }
  )
  return possCounter.pop()
}

module.exports = {part1, part2}