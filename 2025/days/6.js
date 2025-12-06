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

const part2 = input => {
  let rows = input.split('\n')
  let ops = rows.pop()
  let i = 0
  let current_op = null
  let current_sum = 0
  let running_total = 0
  while (i < rows[0].length) {
    if(ops[i]!=' ') current_op = ops[i]
    const n = Number(rows.map(row=>row[i]).join(''))
    if (n) {
      if(current_op=='+') current_sum += n
      else {
        if(current_sum==0) current_sum=n
        else current_sum *= n
      }
    }
    else {
      running_total += current_sum
      current_sum = 0
    }
    i++
  }
  return current_sum + running_total
}

module.exports = {part1, part2}
