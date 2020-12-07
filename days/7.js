const parse = input => input.split('\n').reduce((map,line)=>{
  const [bag,temp] = line.split(' bags contain ')
  const contents = /no other bags/.test(temp)?
    null:
    [...temp.matchAll(/[0-9]+ [a-z]+ [a-z]+/g)].map(x=>{
      let temp = x[0].split(' ')
      return {amt:temp.shift(),type:temp.join(' ')}
    })
  return map.set(bag,contents)
},new Map())

const recursiveRuleCheck = myBag => rules => bag => {
  if(bag==myBag)return true
  const contents = rules.get(bag)
  if(contents==null)return false
  return contents.reduce((a,_r)=>a||recursiveRuleCheck(myBag)(rules)(_r.type),false)
}

const part1 = input => {
  const rules = parse(input)
  const myBag = 'shiny gold'
  const temp = []
  for (const [rule] of rules) {
    if(rule!=myBag){
      const check = recursiveRuleCheck(myBag)(rules)(rule)
      temp.push(check)
    }
  }
  return temp.reduce((a,b)=>a+b,0)
}
const part2 = input => {}

module.exports = {part1, part2}

/*
light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
*/