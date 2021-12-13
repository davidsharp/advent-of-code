const part1 = input => {
  let [dots,instructions] = input.split('\n\n').map(x=>x.split('\n'))
  dots=dots.map(d=>d.split(',').map(Number))
  instructions=instructions.map(i=>{
    const [ax,by] = i.split(' ').pop().split('=')
    return [ax,Number(by)]
  })
  dots = followInstruction(dots,instructions[0])
  return (new Set(dots.map(x=>x.join(',')))).size
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

module.exports = {part1}
