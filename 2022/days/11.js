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
      op[1] = op[1]=='old'?'old':Number(op[1])
      return {
        items,op,
        test:[test,t,f].map(x=>Number(x.split(' ').pop())),
        inspections:0
      }
    }
  )

  let round = 1
  while(round<=10_000){
    if(round%10==0)console.log('round: ',round)
    monkeys.forEach(
      m => {
        let items = [...m.items]
        m.items = []
        m.inspections += items.length
        const n = i => (m.op[1]=='old'?i:BIify(i,m.op[1]))
        items = items.map(i=>{
          // they don't get smaller, but just in case?
          if(isBI(i)&&i<Number.MAX_SAFE_INTEGER)i=Number(i)
          let x = m.op[0] == '+' ? i + n(i) : i * n(i)
          if(x==Infinity)
            x = m.op[0] == '+' ? BigInt(i) + BigInt(n(i))
              : BigInt(i) * BigInt(n(i))
          return x
        })
        items.forEach(
          i => monkeys[i%(BIify(i,m.test[0]))==0?m.test[1]:m.test[2]].items.push(i)
        )
      }
    )
    round++
  }

  console.log(monkeys)

  return monkeys.map(m=>m.inspections)
    .sort((a,b)=>a>b?-1:1).slice(0,2).reduce((a,c)=>a*c)
}

const isBI = i => typeof i == 'bigint'
const BIify = (i,n) => isBI(i)?BigInt(n):n

module.exports = {part1,part2}
