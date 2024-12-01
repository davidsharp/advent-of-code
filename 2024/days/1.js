const parse = input => input.split('\n').reduce((lists, c) => {
  const [a, b] = c.split(/ +/).map(Number)
  lists[0].push(a)
  lists[1].push(b)
  return lists
},[[],[]])

const part1 = input => {
  const [list1, list2] = parse(input)
  list1.sort()
  list2.sort()
  return list1.reduce((acc, a, i) => {
    const b = list2[i]
    return acc + (a>b?a-b:b-a)
  },0)
}

module.exports = {part1}
