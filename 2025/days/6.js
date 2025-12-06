const parse = input => input.split('\n').map(row => row.split(' ').filter(x=>x.length))

const part1 = input => {
  let rows = parse(input)
  const ops = rows.pop()
  rows = rows.map(row=>row.map(Number))
  const answers = rows[0].map((_, i) => {
    return rows.reduce((acc, row) => {
      if(acc == 0) return row[i]
      const op = ops[i]
      if(op == '+') return acc + row[i]
      return acc * row[i]
    },0)
  })
  return answers.reduce((a,b)=>a+b)
}

module.exports = {part1}
