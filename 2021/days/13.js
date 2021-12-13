const part1 = input => {
  let [dots, instructions] = parse(input)
  dots = followInstruction(dots,instructions[0])
  return (new Set(dots.map(x=>x.join(',')))).size
}

const part2 = input => {
  let [dots, instructions] = parse(input)
  dots = instructions.reduce((dots,inst)=>followInstruction(dots,inst),dots)
  let height = 0
  let width = 0
  let grid = []
  dots.forEach(([x,y])=>{
    if(x>width)width=x
    if(y>height)height=y
    if(!grid[y])grid[y]=[]
    grid[y][x]=true
  })
  //console.log(grid.map(row=>row.map(c=>c?'#':'.')).join('\n'))
  let drawnGrid = '\n'
  for(let y = 0;y<=height;y++){
    for(let x = 0;x<=width;x++){
      drawnGrid+=grid[y][x]?'#':'.'
    }
    drawnGrid+='\n'
  }
  return drawnGrid
}

const parse = input => {
  let [dots,instructions] = input.split('\n\n').map(x=>x.split('\n'))
  dots=dots.map(d=>d.split(',').map(Number))
  instructions=instructions.map(i=>{
    const [ax,by] = i.split(' ').pop().split('=')
    return [ax,Number(by)]
  })
  return [dots,instructions]
}

const followInstruction = (dots,instruction) => {
  const [axis,fold] = instruction
  const axisI = axis=='x'?0:1
  return dots.map(
    dot => {
      if(dot[axisI]>fold){
        dot[axisI] = fold - (dot[axisI] - fold)
      }
      return dot
    }
  )
}

module.exports = {part1,part2}
