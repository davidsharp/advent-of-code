const part1 = input => {
  const commands = input.split('\n').map(c=>c.split(' ')).map(([c,x])=>[c,Number(x)])
  const pos = {x:0,y:0}

  commands.forEach(([command,units])=>{
    if(command==='forward') pos.x+=units
    if(command==='down') pos.y+=units
    if(command==='up') pos.y-=units
  })

  return pos.x * pos.y
}

const part2 = input => {
  const commands = input.split('\n').map(c=>c.split(' ')).map(([c,x])=>[c,Number(x)])
  const pos = {x:0,y:0,aim:0} //x = horizontal, y = depth

  commands.forEach(([command,units])=>{
    if(command==='forward') {
      pos.x+=units
      pos.y+=(units*pos.aim)
    }
    if(command==='down') pos.aim+=units
    if(command==='up') pos.aim-=units
  })

  return pos.x * pos.y
}

module.exports = {part1, part2}