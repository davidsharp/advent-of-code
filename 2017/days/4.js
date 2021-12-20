// Day 4 – 1
let passphrases = s => (//console.log(s.split(/\s/).join('\n')),
  //s.split(/\s/).reduce((map,c)=>(map.set(c,(map.get(c)||0)+1)),new Map())
  //Object.values(s.split(/\s/).reduce((o,c)=>({...o,[c]:(o[c]||0)+1}),{}))
  //  .reduce((n,c)=>(c>1?n:n+1),0)
  s.split('\n').map(c=>
    c.split(/\s/).filter(c=>c.length>0))
    .map(c=>c.reduce((o,c)=>({...o,[c]:(o[c]||0)+1}),{}))
    .reduce((n,c)=>(Object.values(c).reduce((_n,_c)=>(!_n?false:_c==1),true)?n+1:n),0)
)
// Day 4 – 2
let passphrases2 = s => (
  s.split('\n').map(c=>
    c.split(/\s/).filter(c=>c.length>0))
    .map(c=>c.reduce((o,c)=>({...o,[p_sort(c)]:(o[p_sort(c)]||0)+1}),{}))
    .reduce((n,c)=>(Object.values(c).reduce((_n,_c)=>(!_n?false:_c==1),true)?n+1:n),0)
)
const p_sort = str => (str.split('').sort().join(''))
// thoughts: initially I misread the question, and my solution was slow
//           it's still a similar solution, but now it's also dirty

module.exports = {part1:passphrases,part2:passphrases2}
