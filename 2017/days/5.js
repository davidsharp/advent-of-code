// Day 5 – 1
let mazeJumper = s => {
  let position=0, steps=0
  const maze=s.split('\n').map(c=>parseInt(c))
  while(position<(maze.length)){
    let oldPos = position
    position=position+maze[position]
    maze[oldPos]=maze[oldPos]+1
    steps++
  }
  return steps
}
// Day 5 – 2
let mazeJumper2 = s => {
  let position=0, steps=0
  const maze=s.split('\n').map(c=>parseInt(c))
  while(position<(maze.length)){
    let oldPos = position
    position=position+maze[position]
    maze[oldPos]=maze[oldPos]+(maze[oldPos]>=3?-1:1)
    steps++
  }
  return steps
}

module.exports = {part1:mazeJumper,part2:mazeJumper2}
