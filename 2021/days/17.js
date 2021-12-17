// expected x,y velocities as args
const part1 = input => {
  let target = input.split(': ')[1].split(', ')
  target = target.reduce((acc,a) => {
    const [d,f,t] = a.split(/=|\.\./)
    return [...acc,[f,t].map(Number)]
  },[])
  let [xVel,yVel] = [...process.argv].pop().split(',').map(Number)
  //if(!yVel || !xVel)console.log('expects <x>,<y> velocities in args');

  console.log(target)

  let pos = [0,0]
  let step = 0
  let hit = false
  // while less than target max
  while(pos[0]<target[0][1] && pos[1]>target[1][1]){
    console.log(`step ${++step}: `, xVel, yVel)
    pos[0]+=xVel
    pos[1]+=yVel
    if(xVel!=0)xVel+=(xVel>0?-1:1)
    yVel--
    console.log(pos)
    if(
      (pos[0]>=target[0][0] || pos<=target[0][1]) &&
      (pos[1]>=target[1][0] || pos<=target[1][1])
    ) {console.log('target hit!');hit = [...pos]}
  }
  if(!hit)console.log('target missed')

  return hit
}

/*
  can use triangular numbers to figure out at what point the x
  velocity drops to 0 with any given initial velocity
  and also for calculating increasing drop speed

   5 4 3 2 1 = 5 + (4+1) + (3+2)
   6 5 4 3 2 1 = 6 + (5+1) + (2+1) + 3

   fn(5) = 5 + (5 * ((5-1)/2))
*/
const triangular = x => x + (x * ((x-1)/2))

module.exports = {part1}
