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

  //console.log(JSON.stringify(monkeys,null,2))

  let round = 1
  while(round<=10_000){
    if(round%10==0)console.log('round: ',round)
    monkeys.forEach(
      m => {
        let items = [...m.items]
        m.items = []
        m.inspections += items.length
        items = items.map(i=>{
          return [...(
          m.op[1] == 'old' ? (
            m.op[0] == '+' ? double(i) : square(i)
          )
          : m.op[0] == '+'? add(i,m.op[1]) : mult(i,m.op[1])
        )]})
        items.forEach(
          i => {
            //console.log(i,m.test[0],mod(i,m.test[0]),Number(i.join(''))%m.test[0])
            monkeys[mod(i,m.test[0])==0?m.test[1]:m.test[2]].items.push(i)
          }
        )
      }
    )
    //console.log('round',round,' ',monkeys.map(m=>m.inspections))
    round++
  }

  return monkeys.map(m=>m.inspections).sort((a,b)=>a>b?-1:1)
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
    if(num[i]>=10){
      if(!num[i+1]) num.push(Math.floor(num[i]/10))
      else num[i+1] += Math.floor(num[i]/10)
      num[i]%=10
    }
    i++
  }
  num.reverse()
  return num
}

console.assert(add([3,7],106).join('')==37+106)
console.assert(mod([3,7],6)==37%6)
console.assert(mult([3,7],106).join('')==37*106)
console.assert(multX([3,6],[2,3]).join('')==36*23)
console.assert(double([1,2,3,4,5,6]).join('')==123456*2)
console.assert(square([1,2,3,4,5,6]).join('')==123456**2)
console.log('tests done')

module.exports = {part2}
