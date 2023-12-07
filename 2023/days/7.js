const part1 = input => input.split('\n').map(line=>{
  const [hand,bid] = line.split(' ')
  let sorted = [...hand].sort().join('')
  let strength = 0
  for(let i = hands.length-1;i>0;i--){
    if(hands[i].test(sorted)){
      strength = i+1 //(0 = high card)
      break
    }
  }

  return {first:hand[0],strength,bid}
}).sort((a,b)=>(
  a.strength>b.strength?1:
  a.strength<b.strength?-1:
  card(a.first)>card(b.first)?1:-1
)).reduce((acc,c,i)=>acc+(c.bid*(i+1)),0)
// ascending strength
const hands = [
  /(.)\1{1}/,
  /(.)\1{1}.?(.)\2{1}/,
  /(.)\1{2}/,
  /(.)\1{3}/,
  /(.)\1{4}/,
]
const card = X => Number(X)||letter[X]
const letter = {T:10,J:11,Q:12,K:13,A:14}

module.exports = { part1 }
