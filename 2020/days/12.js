const parse = input => input.split('\n').map(inst=>({inst:inst[0],val:Number(inst.slice(1))}))

const dirs = {
  N:{dir:'N',r:'E',l:'W'},
  E:{dir:'E',r:'S',l:'N'},
  S:{dir:'S',r:'W',l:'E'},
  W:{dir:'W',r:'N',l:'S'},
}

const part1 = input => {
  const insts = parse(input)
  let dir = dirs.E
  let x = 0
  let y = 0
  const move = (dir,dist) => {
    if(dir=='N')y-=dist
    if(dir=='E')x+=dist
    if(dir=='S')y+=dist
    if(dir=='W')x-=dist
  }
  const turn = (_dir,deg) => {
    const d = _dir.toLowerCase()
    let turns = deg/90
    while(turns){
      dir=dirs[dir[d]]
      turns--
    }
  }
  insts.forEach(({inst,val})=>{
    if(/N|E|S|W/.test(inst))move(inst,val)
    else if(/F/.test(inst))move(dir.dir,val)
    else turn(inst,val)
  })
  return `${Math.abs(x)} + ${Math.abs(y)} = [${Math.abs(x)+Math.abs(y)}]`
}

const part2 = input => {
  const insts = parse(input)
  const waypoint = {x:10,y:-1}
  const ship = {x:0,y:0}
  const move = (dir,dist) => {
    if(dir=='N')waypoint.y-=dist
    if(dir=='E')waypoint.x+=dist
    if(dir=='S')waypoint.y+=dist
    if(dir=='W')waypoint.x-=dist
  }
  const moveShip = times => {
    while(times){
      ship.x+=waypoint.x
      ship.y+=waypoint.y
      times--
    }
  }
  const turn = (dir,deg) => {
    let turns = deg/90
    while(turns){
      let {x,y} = waypoint
      if(dir=='L')x=-x
      if(dir=='R')y=-y
      waypoint.x=y
      waypoint.y=x
      turns--
    }
  }
  insts.forEach(({inst,val})=>{
    if(/N|E|S|W/.test(inst))move(inst,val)
    else if(/F/.test(inst))moveShip(val)
    else turn(inst,val)
  })
  return `${Math.abs(ship.x)} + ${Math.abs(ship.y)} = [${Math.abs(ship.x)+Math.abs(ship.y)}]`
}

module.exports = {part1,part2}