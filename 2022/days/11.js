const part1 = input => {
  const monkeys = input.split('\n\n').map(
    m => {
      let [,items,op,test,t,f] = m.split('\n')
      items = items.split(': ')[1].split(', ').map(Number)
      op = op.split('= old ')[1].split(' ')
      op[1] = Number(op[1])||'old'
      return {
        items,op,
        test:[test,t,f].map(x=>Number(x.split(' ').pop())),
        inspections:0
      }
    }
  )

  let round = 1
  while(round<=20){
    monkeys.forEach(
      m => {
        let items = [...m.items]
        m.items = []
        m.inspections += items.length
        const n = i => (m.op[1]=='old'?i:m.op[1])
        items = items.map(i=>Math.floor((
          m.op[0] == '+'? i + n(i) : i * n(i)
        )/3))
        items.forEach(
          i => monkeys[i%m.test[0]==0?m.test[1]:m.test[2]].items.push(i)
        )
      }
    )
    round++
  }

  return monkeys.map(m=>m.inspections)
    .sort((a,b)=>a>b?-1:1).slice(0,2).reduce((a,c)=>a*c)
}

const part2 = input => {
  const monkeys = input.split('\n\n').map(
    m => {
      let [,items,op,test,t,f] = m.split('\n')
      items = items.split(': ')[1].split(', ').map(Number)
      op = op.split('= old ')[1].split(' ')
      op[1] = Number(op[1])||'old'
      return {
        items,op,
        test:[test,t,f].map(x=>Number(x.split(' ').pop())),
        inspections:0
      }
    }
  )

  let round = 1
  while(round<=20/*10_000*/){
    monkeys.forEach(
      m => {
        let items = [...m.items]
        m.items = []
        m.inspections += items.length
        const n = i => (m.op[1]=='old'?i:m.op[1])
        items = items.map(i=>(
          m.op[0] == '+'? i + n(i) : i * n(i)
        ))
        items.forEach(
          i => monkeys[i%m.test[0]==0?m.test[1]:m.test[2]].items.push(
            i%m.test[0]==0?i/m.test[0]:i
          )
        )
      }
    )
    round++
  }

  return monkeys.map(m=>m.inspections)
}

module.exports = {part1,part2}
