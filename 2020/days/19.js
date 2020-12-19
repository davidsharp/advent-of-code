const parse = input => {
  let [rules,messages] = input.split('\n\n').map(section=>section.split('\n'))
  rules = rules.reduce((map,rule)=>{
    const [key, ...rules] = rule.split(/: | \| /)
    map.set(Number(key),rules.map(r=>{
      if(/"[a-z]"/i.test(r)) return {char: r.match(/"([a-z])"/i)[1]}
      else return {pointers: r.split(' ').map(Number)}
    }))
    return map
  },new Map())
  return {rules, messages}
}

const part1 = input => {
  const {rules,messages} = parse(input)
  console.log(rules)
  console.log(messages)
  const bReg = buildRegex(rules)
  console.log(new RegExp(bReg(0)).test(messages[0]))
  // contruct a regex from the rules?
}

const buildRegex = rules => key => {
  const rule = rules.get(key)
  const subrules = rule.map(subrule=>subrule.char||subrule.pointers.map(p=>buildRegex(rules)(p)))
  return `(${subrules.flat().join('|')})`
}

module.exports = {part1}