const parse = input => {
  const [map,instructions] = input.split('\n\n')
  const {room,robot,boxes} = map.split('\n').reduce(({ room, robot, boxes },line,y) => {
    const row = line.split('').map((char,x) => {
      if(char=='O') boxes.push([x,y])
      if(char=='@') robot = [x,y]
      if(char=='#') return '#'
      else return null
    })
    room.push(row)
    return {room, robot, boxes}
  }, {room:[],robot:null,boxes:[]})
  return {room,robot:new Box(robot[0],robot[1],room),boxes:boxes.map(([x,y])=>(new Box(x,y,room))), instructions}
}
class Box {
  constructor(x,y,room) {
    this.x = x
    this.y = y
    this.room = room
  }
  push(direction) {
    let success = false;
    let dx=0, dy=0;
    if (direction == '>') dx = 1;
    if (direction == '<') dx = -1;
    if (direction == '^') dy = -1;
    if (direction == 'v') dy = 1;
    const space = this.room[this.y + dy][this.x + dx]
    if (space instanceof Box) {
      const _success = space.push(direction)
      if (_success) {
        this.moveTo(this.x+dx,this.y+dy)
        success = true
      }
    }
    // empty
    else if (!space) {
      this.moveTo(this.x+dx,this.y+dy)
      success = true
    }
    return success
  }
  // blindly move, moves to new space, frees previous space
  // overkill?
  moveTo(x,y) {
    this.room[y][x] = this
    this.room[this.y][this.x] = null
    this.x = x
    this.y = y
  }
}
const part1 = input => {
  const {room,robot,boxes,instructions} = parse(input)
  room[robot.y][robot.x] = robot
  // put boxes in room
  boxes.forEach(box => {room[box.y][box.x]=box})
  instructions.split('').filter(x=>/\<|\>|v|\^/.exec(x)).forEach(direction => {
    robot.push(direction)
    //console.log(`Move ${direction}:`)
    //console.log(draw(room,robot))
  })
  return boxes.reduce((sum,box) => (
    sum + ((box.x * 100) + box.y)
  ),0)
}
const draw = (room,robot) => (
  room.map(line => line.map(x => {
    if(x==robot) return '@'
    if(x instanceof Box) return 'O'
    return x || '.'
  })).join('\n')
)

module.exports = {part1}
