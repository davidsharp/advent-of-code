// a regex generated via grex
const {re} = require('./19.regex.js')

const parse = input => {
  let [towels,patterns] = input.split('\n\n')
  towels = towels.split(', ')
  patterns = patterns.split('\n')
  return {towels,patterns}
}

// super slow regex (in JS, at least)
const part1 = input => {
  const {towels,patterns} = parse(input)
  //const re = new RegExp(`^(${towels.join('|')})+$`)
  return patterns.filter((x,i)=>{
    console.log(`${i+1} of ${patterns.length}`)
    return x.match(re)
  }).length
}

module.exports = {part1}
