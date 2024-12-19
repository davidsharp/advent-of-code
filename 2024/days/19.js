const parse = input => {
  let [towels,patterns] = input.split('\n\n')
  towels = new Set(towels.split(', '))
  patterns = patterns.split('\n')
  return {towels,patterns}
}

const part1 = input => {
  const {towels,patterns} = parse(input)
  const longest = [...towels].reduce((l,t)=>(t.length>l.length?t:l),'').length
  const shortest = [...towels].reduce((s,t)=>(t.length<s.length?t:s),''.padStart(longest,'x')).length
  const crawlPattern = pattern => {
    if(pattern.length == 0) return true
    for (let i = longest; i >= shortest; i--) {
      if (towels.has(pattern.slice(0, i))) {
        if(crawlPattern(pattern.slice(i))) return true
      }
    }
    return false
  }
  return patterns.reduce((count, pattern, i) => {
    if (crawlPattern(pattern)) count++
    return count
  },0)
}

module.exports = {part1}
