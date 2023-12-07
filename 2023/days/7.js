const part1 = input => input.split('\n').map(line=>{
  const [hand,bid] = line.split(' ')
  let sorted = [...hand].sort().join('')
  let strength = 0
  for(let i = hands.length-1;i>=0;i--){
    if(hands[i].test(sorted)){
      strength = i+1 //(0 = high card)
      break
    }
  }

  return {hand,strength,bid:Number(bid)}
}).sort((a,b)=>{
  if(a.strength!=b.strength)
    return a.strength>b.strength?1:-1
  else{
    let i = 0
    while(card(a.hand[i])==card(b.hand[i]))
      i++
    return card(a.hand[i])>card(b.hand[i])?1:-1
  }
}).reduce((acc,c,i)=>acc+(c.bid*(i+1)),0)
// ascending strength
const hands = [
  /(.)\1{1}/,
  /(.)\1{1}.?(.)\2{1}/,
  /(.)\1{2}/,
  /^(.)\1{1,2}(.)\2{1,2}$/,
  /(.)\1{3}/,
  /(.)\1{4}/,
]
const card = X => Number(X)||letter[X]
const letter = {T:10,J:11,Q:12,K:13,A:14}

const part2 = input => input.split('\n').map(line=>{
  const [hand,bid] = line.split(' ')
  let temp = [...hand].reduce((a,x)=>{a[x]=a[x]?a[x]+1:1;return a},{})
  let common = ['J',0]
  for(const key in temp){
    if(key!='J'&&temp[key]>common[1]) common = [key,temp[key]]
  }
  let sorted = [...hand.replace(/J/g,common[0])].sort().join('')
  let strength = 0
  for(let i = hands.length-1;i>=0;i--){
    if(hands[i].test(sorted)){
      strength = i+1 //(0 = high card)
      break
    }
  }

  return {hand,strength,bid:Number(bid)}
}).sort((a,b)=>{
  if(a.strength!=b.strength)
    return a.strength>b.strength?1:-1
  else{
    let i = 0
    while(card2(a.hand[i])==card2(b.hand[i]))
      i++
    return card2(a.hand[i])>card2(b.hand[i])?1:-1
  }
}).reduce((acc,c,i)=>acc+(c.bid*(i+1)),0)
const card2 = X => Number(X)||letter2[X]
const letter2 = {T:10,J:1,Q:12,K:13,A:14}

module.exports = { part1, part2 }
