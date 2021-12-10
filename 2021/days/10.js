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

module.exports = {part1}
