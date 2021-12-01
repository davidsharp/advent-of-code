const part1 = input => input.split('\n').map(Number).reduce(({last,inc},curr,i)=>{
  if(i==0) return {last:curr,inc:0}
  if(curr>last) return {last:curr, inc:inc+1}
  else return {last:curr, inc}
},{})

module.exports = {part1}