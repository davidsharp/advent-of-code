// Day 2 – 1
let spreadsheetChecksum = s => {
  // turn the string into a 2D array
  const sheet = s.split('\n').map(c=>c.split(/\s/).filter(c=>c.length>0))
  return sheet.map(c=>c.reduce((acc,_c,i,a)=>(
    {
      hi:!acc.hi||parseInt(_c)>acc.hi?parseInt(_c):acc.hi,
      lo:!acc.lo||parseInt(_c)<acc.lo?parseInt(_c):acc.lo,
    }
  ),{})).map(_c=>(_c.hi-_c.lo)).reduce((a,c)=>(a+c),0)
}
// Day 2 – 2
let spreadsheetChecksum2 = s => {
  // turn the string into a 2D array
  const sheet = s.split('\n').map(c=>c.split(/\s/).filter(c=>c.length>0))

  return sheet.map((row,i,a)=>{
    let hi,lo;    
    return row.map((c,i)=>
      row.filter((_c,_i)=>i!=_i)
         .map(_c=>({hi:parseInt(c),lo:parseInt(_c)}))
         //.reduce(((a,c)=>(a||c.hi%c.lo===0?c:null)),null))
         .find(c=>(c.hi%c.lo===0))
      ).filter(c=>!!c)
  })
  .map(c=>c[0])
  .map(_c=>(_c.hi/_c.lo))
  .reduce((a,c)=>(a+c),0)
}
// thoughts: Thought about using a `...` in my reduce, but there's not much point for two properties
// part 2: maybe there's a good reduce-y way of doing this? row.reduce((acc,c,i,a)=>(?{hi:null,lo:null}:null),null)
//         really, there's too much array nesting that needs to be reduced out sooner

module.exports = {part1:spreadsheetChecksum,part2:spreadsheetChecksum2}
