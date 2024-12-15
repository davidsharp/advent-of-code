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
  canMove(direction) {
    let success = false;
    let dx=0, dy=0;
    if (direction == '>') dx = 1;
    if (direction == '<') dx = -1;
    if (direction == '^') dy = -1;
    if (direction == 'v') dy = 1;
    const space = this.room[this.y + dy][this.x + dx]
    if (space instanceof Box) {
      const _success = space.canMove(direction)
      if (_success) {
        success = true
      }
    }
    // empty
    else if (!space) {
      success = true
    }
    return success
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
      const _success = space.canMove(direction)
      if (_success) {
        space.push(direction)
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
  //console.log(draw(room,robot))
  return boxes.reduce((sum,box) => (
    sum + ((box.y * 100) + box.x)
  ),0)
}
const draw = (room,robot) => (
  room.map(line => line.map(x => {
    if(x==robot) return '@'
    if(x instanceof Box) return 'O'
    return x || '.'
  })).join('\n')
)

const parse2 = input => {
  const [map,instructions] = input.split('\n\n')
  const {room,robot,boxes} = map.split('\n').reduce(({ room, robot, boxes },line,y) => {
    const row = line.split('').flatMap((char,x) => {
      if(char=='O') boxes.push([x*2,y])
      if(char=='@') robot = [x*2,y]
      if(char=='#') return ['#','#']
      else return [null,null]
    })
    room.push(row)
    return {room, robot, boxes}
  }, {room:[],robot:null,boxes:[]})
  return {room,robot:new Box(robot[0],robot[1],room),boxes:boxes.map(([x,y])=>(new Box2(x,y,room))), instructions}
}
class Box2 extends Box {
  canMove(direction) {
    let success = false;
    let dx=0, dy=0;
    if (direction == '>') dx = 1;
    if (direction == '<') dx = -1;
    if (direction == '^') dy = -1;
    if (direction == 'v') dy = 1;
    if (direction == '^' || direction == 'v') {
      const space1 = this.room[this.y + dy][this.x + dx]
      const space2 = this.room[this.y + dy][this.x + 1 + dx]

      // empty
      if (!space1 && !space2) {
        success = true
      }
      else if (space1 == '#' || space2 == '#') {
        success = false
      }
      else {
        success = (!space1 || space1.canMove(direction)) && (!space2 && space2.canMove(direction))
      }
    }
    else {
      // account for left push?
      const space = this.room[this.y + dy][this.x + dx]
      if (space instanceof Box2) {
        success = space.canMove(direction)
      }
      // empty
      else if (!space) {
        success = true
      }
    }

    return success
  }
  push(direction) {
    let dx=0, dy=0;
    if (direction == '>') dx = 1;
    if (direction == '<') dx = -1;
    if (direction == '^') dy = -1;
    if (direction == 'v') dy = 1;
    const space1 = this.room[this.y + dy][this.x + dx]
    const space2 = this.room[this.y + dy][this.x + 1 + dx]

    const success = this.canMove(direction)
    if(success){
      if (space1 instanceof Box2) {
        const _success = space1.push(direction)
        if (_success) {
          this.moveTo(this.x+dx,this.y+dy)
        }
      }
      if (space2 instanceof Box2 && space2 != space1) {
        const _success = space2.push(direction)
        if (_success) {
          this.moveTo(this.x+dx,this.y+dy)
        }
      }
    }
    return success
  }
  moveTo(x,y) {
    this.room[y][x] = this
    this.room[y][x+1] = this
    this.room[this.y][this.x] = null
    this.room[this.y][this.x+1] = null
    this.x = x
    this.y = y
  }
}
const part2 = input => {
  const {room,robot,boxes,instructions} = parse2(input)
  room[robot.y][robot.x] = robot
  // put boxes in room
  boxes.forEach(box => {
    room[box.y][box.x]=box
    room[box.y][box.x+1]=box
  })
  console.log(draw(room,robot))
  instructions.split('').filter(x=>/\<|\>|v|\^/.exec(x)).forEach(direction => {
    robot.push(direction)
    console.log(`Move ${direction}:`)
    console.log(draw(room,robot))
  })
  return boxes.reduce((sum,box) => (
    sum + ((box.y * 100) + box.x)
  ),0)
}

module.exports = { part1 ,part2}

/*
#######
#...#.#
#.....#
#..OO.#
#..O@.#
#.....#
#######

^
<vv<<^^<<^^
*/
