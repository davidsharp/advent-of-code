const parse = input => input.split('\n\n').map(group=>group.split('\n'))

const part1 = input => {
  const groups = parse(input)
  return groups.reduce((total, group)=>(
    total + group.join('').split('').reduce((gTotal,q)=>gTotal.add(q),new Set()).size
  ),0)
}
const part2 = input => {
  const groups = parse(input)
  return groups.map(group=>{
    if(group.length==1) return group[0].length
    const allYes = new Set()
    const leader = group[0].split('').sort()
    leader.forEach(
      q => {
        for(let i=1;i<group.length;i++){
          if(group[i].indexOf(q)==-1)return;
        }
        allYes.add(q)
      }
    )
    return allYes.size
  }).reduce((a,b)=>a+b,0)
}

module.exports = {part1, part2}