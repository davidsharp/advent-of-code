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
  const regex = `^${buildRegex(rules)(0)}$`
  const matches = messages.map(
    message=>new RegExp(regex).test(message)
  )
  return matches.reduce((a,b)=>a+b,0)
}

const buildRegex = rules => key => {
  const rule = rules.get(key)
  if(rule[0].char)return rule[0].char
  const subrules = rule.map(subrule=>subrule.pointers.map(p=>buildRegex(rules)(p)).join(''))
  return `(${subrules.join('|')})`
}

module.exports = {part1}