const parseCards = input => input.split('\n').map(x=>x.split(/: +/).pop()).map(
  card => {
    const [winning,numbers] = card.split(/ +\| +/).map(x=>x.split(/ +/).map(Number))
    let matches = 0
    for(const num of winning){
      if(numbers.includes(num)) matches++
    }
    return matches
  }
)

const part1 = input => parseCards(input).reduce((a,b)=>a+Math.floor(2**(b-1)))

const part2 = input => parseCards(input).reduce(({stock,total},matches,i,a)=>{
  if(!stock) stock = a.map(_=>1)
  for(var x = 1;x<=matches;x++){
    stock[i+x] += stock[i]
  }
  return {stock,total:total+stock[i]}
},{stock:null,total:0}).total

module.exports = { part1, part2 }