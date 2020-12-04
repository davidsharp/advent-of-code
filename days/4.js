const parse = input => input.split('\n\n').filter(x=>x).map(entry=>(
  Object.fromEntries(entry.split(/ |\n/).map(field=>field.split(':')))
))

const part1 = input => {
  const docs = parse(input)
  return docs.reduce(
    (count,doc)=>(Object.values(doc).length==8 || (Object.values(doc).length==7 && !doc.cid))?count+1:count
  ,0)
}
const part2 = input => {}

module.exports = {part1,part2}