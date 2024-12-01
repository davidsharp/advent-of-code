const parse = input => input.split('\n').reduce((lists, c) => {
  const [a, b] = c.split(/ +/).map(Number)
  lists[0].push(a)
  lists[1].push(b)
  return lists
},[[],[]])

const part1 = input => {
  const [list1, list2] = parse(input).map(l=>l.toSorted())
  return list1.reduce((acc, a, i, _, b=list2[i]) =>
    acc + (a>b?a-b:b-a)
  ,0)
}

const part2 = input => {
  const [list1, list2] = parse(input)
  return list1.reduce((acc, a) =>
    acc + (a * list2.filter(b=>a==b).length)
  ,0)
}

module.exports = {part1, part2}
