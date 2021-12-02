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

module.exports = {part1}