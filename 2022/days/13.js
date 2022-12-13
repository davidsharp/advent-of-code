const compare = (left,right)=>{
  let l = left
  let r = right
  if(typeof l == typeof r){
    if(typeof l == 'number') return l==r?'=':l<r;
    // else both arrays
  }
  else {
    // making number into array
    if(typeof l == 'number')l=[l];
    else r=[r];
  }
  // handle arrays
  let i = 0
  while(i<l.length){
    if(r[i] == undefined) return false
    const c = compare(l[i],r[i])
    if(c!='=')return c
    i++
  }
  // r was longer?
  return r.length>l.length?true:'='
}

const part1 = input => input.split('\n\n').map(
  pair => {
    const [l,r] = pair.split('\n').map(JSON.parse)
    return compare(l,r)
  }
).reduce((a,c,i)=>c?a+i+1:a,0)

const part2 = input => [[[2]],[[6]],...input.split('\n\n').map(
  pair => pair.split('\n').map(JSON.parse)
).flat()].sort((a,b)=>compare(a,b)?-1:1).map(JSON.stringify)
.reduce((a,c,i)=>/^\[\[(2|6)\]\]$/.test(c)?a*(i+1):a,1)

module.exports = {part1,part2}
