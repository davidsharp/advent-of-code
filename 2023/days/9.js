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
    let diffs = values.map((v,i)=>values[i+1]-v)
    diffs.pop()
    return calcNext(diffs) + values[values.length-1]
  }
}

module.exports = { part1 }
