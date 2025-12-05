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

const part2 = input => {
  const [ranges] = parse(input)
  return ranges.toSorted((a,b)=>{
    if (a[0] < b[0]) return -1
    if (a[0] > b[0]) return 1
    if (a[1] < b[1]) return -1
    if (a[1] > b[1]) return 1
    return 0
  }).reduce((newRanges, range, i) => {
    if(i==0) return [range]
    const last = newRanges.pop()
    if (last[0]<=range[0] && last[1] >= range[0]) {
      newRanges.push([last[0], range[1] > last[1] ? range[1] : last[1]])
    }
    else newRanges.push(last,range)
    return newRanges
  }, []).reduce((count, range) => count + (range[1]-range[0]) + 1,0)
}

module.exports = {part1,part2}
