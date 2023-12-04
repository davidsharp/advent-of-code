const part1 = input => input.split('\n').map(x=>x.split(/: +/).pop()).map(
  card => {
    const [winning,numbers] = card.split(/ +\| +/).map(x=>x.split(/ +/).map(Number))
    let matches = 0
    for(const num of winning){
      if(numbers.includes(num)) matches++
    }
    return Math.floor(2**(matches-1))
  }
).reduce((a,b)=>a+b)

const part2 = input => input.split('\n').map(x=>x.split(/: +/).pop()).map(
  card => {
    const [winning,numbers] = card.split(/ +\| +/).map(x=>x.split(/ +/).map(Number))
    let matches = 0
    for(const num of winning){
      if(numbers.includes(num)) matches++
    }
    return matches
  }
).reduce((stock,matches,i,a)=>{
  if(!stock) stock = a.map(_=>1)
  for(var x = 1;x<=matches;x++){
    stock[i+x] += stock[i]
  }
  return stock
},null).reduce((a,b)=>a+b)

module.exports = { part1, part2 }