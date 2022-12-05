const part1 = input => {
  let [stacks,inst] = input.split('\n\n')
  stacks = stacks.split('\n')
  const total = Number(stacks.pop().split(' ').filter(x=>x).pop())
  stacks.reverse()
  stacks=stacks.reduce((a,row)=>{
    // filter for every other character
    const cr8s = row.split('').filter((x,i)=>i%2)
    // remove gaps in between
    .filter((x,i)=>!(i%2))
    cr8s.forEach(
      (c,i)=>{
        if(c != ' ')a[i].push(c);
      }
    )
    return a
  },Array(total).fill().map(_=>[]))

  inst = inst.split('\n').map(x=>x.split(' ').filter((x,i)=>i%2).map(Number))
  inst.forEach(
    ([move,frm,to])=>{
      while(move-->0)stacks[to-1].push(stacks[frm-1].pop())
    }
  )

  return stacks.map(s=>s.pop()).join('')
}

module.exports = {part1}
