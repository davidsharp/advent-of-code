const part1 = input => {
  const histories = input.split('\n').map(x=>x.split(' ').map(Number))
  return histories.map(
    hist => calcNext(hist)
  ).reduce((a,b)=>a+b)
}
const calcNext = values => {
  const test = new Set(values)
  if(test.size == 1 && test.has(0)){
    return 0
  }
  else {
    let diffs = values.map((a,i)=>{
      const b = values[i+1]
      const big = Math.max(a,b)
      const small = Math.min(a,b)
      return Math.abs(big - small)
    })
    diffs.pop()
    return calcNext(diffs) + values[values.length-1]
  }
}

module.exports = { part1 }
