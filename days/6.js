const parse = input => input.split('\n\n').map(group=>group.split('\n'))

const part1 = input => {
  const groups = parse(input)
  return groups.reduce((total, group)=>(
    total + group.join('').split('').reduce((gTotal,q)=>gTotal.add(q),new Set()).size
  ),0)
}
const part2 = input => {}

module.exports = {part1, part2}