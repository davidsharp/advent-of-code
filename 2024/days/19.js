const parse = input => {
  let [towels,patterns] = input.split('\n\n')
  towels = towels.split(', ')
  patterns = patterns.split('\n')
  return {towels,patterns}
}

const part1 = input => {
  const {towels,patterns} = parse(input)
  const re = new RegExp(`^(${towels.join('|')})+$`)
  return patterns.filter(x=>re.exec(x)).length
}

module.exports = {part1}
