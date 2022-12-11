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
      // storing ints as arrays: 42 -> [4,2]
      items = items.split(': ')[1].split(', ').map(x=>x.split('').map(Number))
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
  while(round<=10_000){
    monkeys.forEach(
      m => {
        let items = [...m.items]
        m.items = []
        m.inspections += items.length
        items = items.map(i=>((
          m.op[1] == 'old' ? (
            m.op[0] == '+' ? double(i) : square(i)
          )
          : m.op[0] == '+'? add(i,m.op[1]) : mult(i,m.op[1])
        )))
        items.forEach(
          i => monkeys[mod(i,m.test[0])==0?m.test[1]:m.test[2]].items.push(i)
        )
      }
    )
    round++
  }

  return monkeys.map(m=>m.inspections)
    .sort((a,b)=>a>b?-1:1).slice(0,2).reduce((a,c)=>a*c)
}

const add = (num,i) => {
  num[num.length-1] += i
  return massage(num)
}
const mult = (num,i) => {
  num = massage(num.map(x=>x*i))
  return num
}
const multX = (num1,num2) => { //multiply arrays
  const w = num1.length
  const h = num2.length
  let grid = Array(w).fill(0).map(_=>Array(h).fill(0))
  grid = grid.map(
    (x,i) => x.map((y,j)=>num1[i]*num2[j])
  )
  const newNum = []
  for(let x = 0;x<w;x++){
    for(let y = 0;y<h;y++){
      newNum[x+y] = (newNum[x+y]||0) + grid[w-1-x][h-1-y]
    }
  }

  newNum.reverse()

  return massage(newNum)
}
const mod = (num,i) => {
  //const q/*uotient*/ = Array(num.length).fill(0)
  let r = 0
  num.forEach(
    (n,ind) => {
      //q[ind]=Math.floor(((r*10)+n)/i)
      r = ((r*10)+n)%i
    }
  )

  return r
  //return Number(q.join(''))
} // long division, grab remainder
const double = (num) => {
  num = massage(num.map(x=>x*2))
  return num
}
const square = (num) => multX(num,num) // multX shorthand
const massage = num => {
  num.reverse()
  let i = 0
  while(i<num.length){
    if(num[i]>10){
      if(!num[i+1]) num.push(Math.floor(num/10))
      else num[i+1] += Math.floor(num/10)
      num[i]%=10
    }
  }
  num.reverse()
  return num
}

module.exports = {part1,part2}
