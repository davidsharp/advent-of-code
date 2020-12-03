const parse = input => input.split('\n').map(row=>row.split(''))

const part1 = input => { //r3-d1
  const forest = parse(input)
  let treesHit = 0
  let x = 0
  forest.forEach(row=>{
    if(row[x%row.length]=='#')treesHit++
    x+=3
  })
  return treesHit
}
const part2 = input => {}

module.exports = {part1,part2}