const part1 = input => input.split('\n').map(Number).reduce(({last,inc},curr,i)=>{
  if(i==0) return {last:curr,inc:0}
  if(curr>last) return {last:curr, inc:inc+1}
  else return {last:curr, inc}
},{})?.inc

const part2 = input => input.split('\n').map(Number).reduce(({last,inc},curr,i,a)=>{
  if(i>=a.length-2)return {last,inc}
  const win = curr + a[i+1] + a[i+2]
  if(i==0) return {last:win,inc:0}
  if(win>last) return {last:win, inc:inc+1}
  else return {last:win, inc}
},{})?.inc

module.exports = {part1, part2}