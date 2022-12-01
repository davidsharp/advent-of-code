const part1 = input => input.split('\n\n').reduce(
  (best,elf)=>(elf=elf.split('\n').reduce((a,c)=>a+Number(c),0),elf>best?elf:best),0
)

const part2 = input => input.split('\n\n').map(
  elf=>elf.split('\n').reduce((a,c)=>a+Number(c),0)
).sort((a,b)=>a>b?-1:1).slice(0,3).reduce((a,c)=>a+c)

module.exports = {part1, part2}