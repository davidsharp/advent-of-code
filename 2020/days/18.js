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

const part2 = input => {
  const problems = parse(input)
  return problems.map(solveProblem2).reduce((a,b)=>a+b,0)
}

const solveProblem2 = tokens => {
  let parsedTokens = [];
  let ignoreDepth = 0;
  let terminated = null;
  // parsing tokens
  tokens.forEach((token,i)=>{
    if(terminated)return;
    if(token=='('){
      if(ignoreDepth==0){
        const innerResult = solveProblem2(tokens.slice(i+1))
        parsedTokens.push(innerResult)
      }
      ignoreDepth++
    }else if(token==')'){
      ignoreDepth--
      if(ignoreDepth<0)terminated=true
    }else if(ignoreDepth!=0)return;
    else parsedTokens.push(token)
  })

  //loop and add
  while(parsedTokens.findIndex(x=>x=='+')>-1){
    const found = parsedTokens.findIndex(x=>x=='+')
    const added = parsedTokens[found-1]+parsedTokens[found+1]
    parsedTokens=[
      ...parsedTokens.slice(0,found-1),
      added,
      ...parsedTokens.slice(found+2)
    ]
  }
  //loop and multiply
  const solved = parsedTokens.join('').split('*').reduce((a,b)=>a*parseInt(b),1)

  return solved
}

module.exports = {part1,part2}