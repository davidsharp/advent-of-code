const part1 = input => {
  const lines = input.split('\n').map(line=>line.split(''))
  let sum = 0
  lines.forEach((line,y)=>{
    line.forEach((char,x)=>{
      if(char=='X') sum += onXFound(lines,x,y)
    })
  })
  return sum
}
const onXFound = (lines,x,y) => {
  let sum = 0
  for(let i=-1;i<=1;i++){
    if(lines[y+(i*3)]){
      for(let j=-1;j<=1;j++){
        if(lines[y+(i*3)][x+(j*3)]){
          let found = true
          for(let l=1;l<4;l++){
            if(lines[y+(i*l)][x+(j*l)]!='XMAS'[l]) found=false
          }
          if(found) sum++
        }
      }
    }
  }
  return sum
}

module.exports = {part1}
