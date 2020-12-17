const parse = input => {
  const set = new Set()
  input.split('\n').forEach((row,y)=>{
    row.split('').forEach((col,x)=>{if(col=='#')set.add(`${x},${y},0`)})
  })
  return {state:set,bounds:[[0,input.split('\n')[0].length],[0,input.split('\n').length],[0,0]]}
}

const part1 = input => {
  const {state,bounds} = parse(input)
  let turns = 0
  while(turns<6){//console.log('turn',turns+1)
    const prevState = new Set(state)
    // re-define cube boundaries
    prevState.forEach(val=>{
      const [x,y,z] = val.split(',').map(Number)
      if(x-1<bounds[0][0])bounds[0][0]=x-1;
      if(x+1>bounds[0][1])bounds[0][1]=x+1;
      if(y-1<bounds[1][0])bounds[1][0]=y-1;
      if(y+1>bounds[1][1])bounds[1][1]=y+1;
      if(z-1<bounds[2][0])bounds[2][0]=z-1;
      if(z+1>bounds[2][1])bounds[2][1]=z+1;
    })
    for(let x=bounds[0][0];x<=bounds[0][1];x++){
      for(let y=bounds[1][0];y<=bounds[1][1];y++){
        for(let z=bounds[2][0];z<=bounds[2][1];z++){
          let count = 0;
          //let neighbours = [];
            for(let _x=-1;_x<=1;_x++){
              for(let _y=-1;_y<=1;_y++){
                for(let _z=-1;_z<=1;_z++){
                  if(!(_x==0&&_y==0&&_z==0)&&prevState.has(`${x+_x},${y+_y},${z+_z}`)){
                    count++
                    //neighbours.push([x+_x,y+_y,z+_z])
                  }
                }
              }
            }
          //console.log(x,y,z,'has',count,'neighbours',neighbours)
          if(prevState.has(`${x},${y},${z}`)){
            //console.log('and is active')
            if(!(count==2||count==3)){
              //console.log('setting inactive')
              state.delete(`${x},${y},${z}`)
            }
          }
          else {
            //console.log('and is inactive')
            if(count==3){
              //console.log('setting active')
              state.add(`${x},${y},${z}`)
            }
          }
        }
      }
    }
    turns++
  }
  return state.size
}

const parse2 = input => {
  const set = new Set()
  input.split('\n').forEach((row,y)=>{
    row.split('').forEach((col,x)=>{if(col=='#')set.add(`${x},${y},0,0`)})
  })
  return {state:set,bounds:[[0,input.split('\n')[0].length],[0,input.split('\n').length],[0,0],[0,0]]}
}

const part2 = input => {
  const {state,bounds} = parse2(input)
  let turns = 0
  while(turns<6){
    const prevState = new Set(state)
    // re-define cube boundaries
    prevState.forEach(val=>{
      const [x,y,z,w] = val.split(',').map(Number)
      if(x-1<bounds[0][0])bounds[0][0]=x-1;
      if(x+1>bounds[0][1])bounds[0][1]=x+1;
      if(y-1<bounds[1][0])bounds[1][0]=y-1;
      if(y+1>bounds[1][1])bounds[1][1]=y+1;
      if(z-1<bounds[2][0])bounds[2][0]=z-1;
      if(z+1>bounds[2][1])bounds[2][1]=z+1;
      if(w-1<bounds[3][0])bounds[3][0]=w-1;
      if(w+1>bounds[3][1])bounds[3][1]=w+1;
    })
    for(let x=bounds[0][0];x<=bounds[0][1];x++){
      for(let y=bounds[1][0];y<=bounds[1][1];y++){
        for(let z=bounds[2][0];z<=bounds[2][1];z++){
          for(let w=bounds[3][0];w<=bounds[3][1];w++){
            let count = 0;
              for(let _x=-1;_x<=1;_x++){
                for(let _y=-1;_y<=1;_y++){
                  for(let _z=-1;_z<=1;_z++){
                    for(let _w=-1;_w<=1;_w++){
                      if(!(_x==0&&_y==0&&_z==0&&_w==0)&&prevState.has(`${x+_x},${y+_y},${z+_z},${w+_w}`)){
                        count++
                      }
                    }
                  }
                }
              }
            if(prevState.has(`${x},${y},${z},${w}`)){
              if(!(count==2||count==3)){
                state.delete(`${x},${y},${z},${w}`)
              }
            }
            else {
              if(count==3){
                state.add(`${x},${y},${z},${w}`)
              }
            }
          }
        }
      }
    }
    turns++
  }
  return state.size
}

module.exports = {part1,part2}

/*
If a cube is active and exactly 2 or 3 of its neighbors are also active, the cube remains active. Otherwise, the cube becomes inactive.
If a cube is inactive but exactly 3 of its neighbors are active, the cube becomes active. Otherwise, the cube remains inactive.
*/