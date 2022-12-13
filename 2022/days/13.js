const part1 = input => input.split('\n\n').map(
  pair => {
    const [l,r] = pair.split('\n').map(JSON.parse)
    return compare(l,r)
  }
).reduce((a,c,i)=>c?a+i+1:a,0)

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
  // r was longer
  return true
}

module.exports = {part1}
