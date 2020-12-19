const parse = input => {
  let [rules,messages] = input.split('\n\n').map(section=>section.split('\n'))
  rules = rules.reduce((map,rule)=>{
    const [key, ...rules] = rule.split(/: | \| /)
    map.set(key,rules.map(r=>{
      if(/"[a-z]"/i.test(r)) return {char: r.match(/"([a-z])"/i)[1]}
      else return {pointers: r.split(' ')}
    }))
    return map
  },new Map())
  return {rules, messages}
}

const part1 = input => {
  const {rules,messages} = parse(input)
  console.log(rules)
  console.log(messages)
  // contruct a regex from the rules?
}

module.exports = {part1}