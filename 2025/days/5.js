const parse = input => {
  let [ranges,ingredients] = input.split('\n\n').map(x=>x.split('\n'))
  return [ranges.map(r=>r.split('-').map(Number)),ingredients.map(Number)]
}

const part1 = input => {
  const [ranges,ingredients] = parse(input)
  return ingredients.reduce((fresh, ingred) => (ranges.find(
    ([min,max])=>(ingred>=min&&ingred<=max)
  )?fresh+1:fresh),0)
}

module.exports = {part1}
