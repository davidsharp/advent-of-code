const part1 = input => input.split('\n').map(x=>x.split(/: +/).pop()).map(
  card => {
    const [winning,numbers] = card.split(/ +\| +/).map(x=>x.split(/ +/).map(Number))
    //return {winning,numbers}
    let matches = 0
    for(const num of winning){
      if(numbers.includes(num)) matches++
    }
    return Math.floor(2**(matches-1))
  }
).reduce((a,b)=>a+b)

module.exports = { part1 }