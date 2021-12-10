const part1 = input => {
  const chunks = input.split('\n').map(x=>x.split(''))
  return chunks.reduce((acc,chunk)=>{
    let stack = []
    let points = 0
    let index = 0
    while(index<chunk.length && !points){
      if(/\(|\[|{|</.test(chunk[index]))
        stack.push(chunk[index])
      else {
        const open = stack.pop()
        const matching = matchBrackets(open,chunk[index])
        if(!matching) points = scores[chunk[index]]
      }
      index++
    }
    return acc+points
  },0)
}

const part2 = input => {
  const chunks = input.split('\n').map(x=>x.split(''))
  const scores = chunks.reduce((acc,chunk)=>{
    let stack = []
    let points = 0
    let corrupted = false
    let index = 0
    while(index<chunk.length && !corrupted){
      if(/\(|\[|{|</.test(chunk[index]))
        stack.push(chunk[index])
      else {
        const open = stack.pop()
        const matching = matchBrackets(open,chunk[index])
        if(!matching) corrupted = true
      }
      index++
    }
    if(corrupted)return acc
    while(stack.length) {
      points*=5
      points+=scores2[stack.pop()]
    }
    acc.push(points)
    return acc
  },[]).sort((a,b)=>a-b)
  return scores[Math.floor(scores.length/2)]
}

const matchBrackets = (open,close) => (
    (open == '(' && close == ')') ||
    (open == '[' && close == ']') ||
    (open == '{' && close == '}') ||
    (open == '<' && close == '>')
  )

const scores = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

// opening brackets for ease
const scores2 = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
}

module.exports = {part1,part2}
