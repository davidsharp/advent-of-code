const part1 = input => input.split('\n').map(Number).map(
  (x,i,a)=>{
    const y = a.filter(y=>x+y===2020)[0]
    return y?x*y:null
  }
).filter(x=>x)[0]
const part2 = input => {
  const list = input.split('\n').map(Number)
  let answer = 0
  for(let i=0;i<list.length;i++){
    for(let j=0;j<list.length;j++){
      for(let k=0;k<list.length;k++){
        if(
          i!=j && i!=k && j!=k &&
          list[i]+list[j]+list[k]===2020
        ){
          answer=list[i]*list[j]*list[k]
          break;
        }
      }
      if(answer)break;
    }
    if(answer)break;
  }
  return answer
}

module.exports = {part1,part2}