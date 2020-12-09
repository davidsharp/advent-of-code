const parse = input => input.split('\n').map(Number)

const part1 = input => {
  const initialValues = parse(input)
  const consider = 25
  const preamble = initialValues.slice(0,consider)
  const values = initialValues.slice(consider)
  let weakness = null;
  while(!weakness){
    const i = values.shift()
    if(!preamble.reduce((a,b)=>a||preamble.find(c=>(c!=b && c==i-b)),false))
      weakness = i;
    preamble.shift()
    preamble.push(i)
  }
  return weakness
}
const part2 = input => {}

module.exports = {part1, part2}