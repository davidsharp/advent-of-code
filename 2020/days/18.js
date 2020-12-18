const parse = input => input.split('\n')
  .map(line=>line.replace(/\(/g,'( ').replace(/\)/g,' )').split(' ').map(token=>parseInt(token)||token))

const part1 = input => {
  const problems = parse(input)
  return problems.map(solveProblem).reduce((a,b)=>a+b,0)
}

const solveProblem = tokens => {
  //console.log(tokens)
  let total = null;
  let op = null;
  let ignoreDepth = 0;
  let terminated = null;
  tokens.forEach((token,i)=>{
    //if(ignoreDepth>=0)console.log(token,ignoreDepth,total)
    if(terminated)return;
    if(token=='('){
      if(ignoreDepth==0){
        const innerResult = solveProblem(tokens.slice(i+1))
        total=total==null?innerResult:op(total,innerResult)
      }
      ignoreDepth++
    }
    if(token==')'){
      ignoreDepth--
      if(ignoreDepth<0)terminated=true
    }
    if(ignoreDepth!=0)return;
    if(token=='+')op=plus
    if(token=='*')op=mult
    if(parseInt(token)){
      total=total==null?token:op(total,token)
    }
  })
  //console.log(tokens.join(''),'=',total)
  return total
}
const plus = (a,b) => (
  //console.log(`adding ${a}+${b}`),
  a+b
)
const mult = (a,b) => (
  //console.log(`multing ${a}*${b}`),
  a*b
)

const log = (depth,...rest) => console.log(''.padStart('-',depth),...rest)

module.exports = {part1}