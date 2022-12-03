const lower = 96
const upper = 65

const part1 = input => input.split('\n').map(
  rucksack => {
    rucksack = rucksack.split('')
    const c1 = rucksack.slice(0,rucksack.length/2)
    const c2 = rucksack.slice(rucksack.length/2)
    const item = c1.find(x=>c2.find(y=>x==y))
    const match = item.charCodeAt()
    let value = match - lower <= 0 ? match - upper + 27 : match - lower
    return value
  }
).reduce((a,c)=>a+c)

const part2 = input => {
  const rucksacks = input.split('\n')
  const groups = []
  let currentGroup = []
  rucksacks.forEach(r=>{
    currentGroup.push(r.split(''))
    if(currentGroup.length==3){
      groups.push(currentGroup)
      currentGroup = []
    }
  })
  return groups.map(
    g => {
      const item = g[0].find(x=>g[1].find(y=>x==y)&&g[2].find(y=>x==y))
      const match = item.charCodeAt()
      let value = match - lower <= 0 ? match - upper + 27 : match - lower
      return value
    }
  ).reduce((a,c)=>a+c)
}

module.exports = {part1, part2}
