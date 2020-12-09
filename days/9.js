const parse = input => input.split('\n').map(Number)

const part1 = input => {
  const initialValues = parse(input)
  const consider = 25
  const preamble = initialValues.slice(0,consider)
  const values = initialValues.slice(consider)
  let weakness = null;
  while(!weakness){
    const i = values.shift()
    if(!preamble.reduce((a,b)=>a||preamble.find(c=>(c!=b && c==i-b)),false))
      weakness = i;
    preamble.shift()
    preamble.push(i)
  }
  return weakness
}
const part2 = input => {
  const goal = part1(input)
  const data = parse(input)
  let setFound = null;
  for(let i = 0;!setFound&&i<data.length;i++){
    if(data[i]<goal){
      setFound=sumToFindSet(data,i,goal)
      if(setFound)setFound=data.slice(i,setFound)
    }
  }
  setFound = setFound.sort((a,b)=>a>b?1:-1)
  return setFound.shift()+setFound.pop()
}
const sumToFindSet = (array, offset, goal) => {
  let sum = 0
  let index = 0
  while(sum<goal){
    sum+=array[offset+index++]
  }
  if(sum==goal) return offset+index
  else return false
}

module.exports = {part1, part2}