module.exports = {
  part1: data=>{
    const [wireA, wireB] = data.split('\n').map(w=>w.split(','));
    const coords = wireA.reduce((o,i)=>{
      const dir=i.slice(0,1)
      const val=Number(i.slice(1))
      const targetpos={...o.pos,...(
      dir=='U'? {y:o.pos.y-val} :
      dir=='D'? {y:o.pos.y+val}:
      dir=='L'? {x:o.pos.x-val}:
          /*R*/ {x:o.pos.x+val})}
      const set=o.set
      let pos=o.pos;
      while(pos.x!=targetpos.x||pos.y!=targetpos.y){
        pos={...o.pos,...(
          dir=='U'? {y:o.pos.y--} :
          dir=='D'? {y:o.pos.y++}:
          dir=='L'? {x:o.pos.x--}:
              /*R*/ {x:o.pos.x++})}
        set.add(`${pos.x},${pos.y}`)
      }
      return {pos:targetpos,set}
    },{pos:{x:0,y:0},set:new Set()}).set
    return wireB.reduce((o,i)=>{
      let manhattan=o.manhattan
      const dir=i.slice(0,1)
      const val=Number(i.slice(1))
      const targetpos={...o.pos,...(
      dir=='U'? {y:o.pos.y-val} :
      dir=='D'? {y:o.pos.y+val}:
      dir=='L'? {x:o.pos.x-val}:
          /*R*/ {x:o.pos.x+val})}
      const set=o.set
      let pos=o.pos;
      while(pos.x!=targetpos.x||pos.y!=targetpos.y){
        pos={...o.pos,...(
          dir=='U'? {y:o.pos.y--} :
          dir=='D'? {y:o.pos.y++}:
          dir=='L'? {x:o.pos.x--}:
              /*R*/ {x:o.pos.x++})}
        if(coords.has(`${pos.x},${pos.y}`)){
          const x=Math.abs(pos.x)+Math.abs(pos.y)
          if(!manhattan||x<manhattan)manhattan=x
        }
      }
      return {pos:targetpos,manhattan}
    },{pos:{x:0,y:0},manhattan:null}).manhattan
  },
  part2: data=>{
    const [wireA, wireB] = data.split('\n').map(w=>w.split(','));
    const coords = wireA.reduce((o,i)=>{
      let steps=o.steps-1
      const dir=i.slice(0,1)
      const val=Number(i.slice(1))
      const targetpos={...o.pos,...(
      dir=='U'? {y:o.pos.y-val} :
      dir=='D'? {y:o.pos.y+val}:
      dir=='L'? {x:o.pos.x-val}:
          /*R*/ {x:o.pos.x+val})}
      const map=o.map
      let pos=o.pos;
      while(pos.x!=targetpos.x||pos.y!=targetpos.y){
        steps++;
        pos={...o.pos,...(
          dir=='U'? {y:o.pos.y--} :
          dir=='D'? {y:o.pos.y++}:
          dir=='L'? {x:o.pos.x--}:
              /*R*/ {x:o.pos.x++})}
        map.set(`${pos.x},${pos.y}`,steps)
      }
      return {pos:targetpos,map,steps}
    },{pos:{x:0,y:0},map:new Map(),steps:0}).map
    return wireB.reduce((o,i)=>{
      let steps=o.steps-1
      let minsteps=o.minsteps
      const dir=i.slice(0,1)
      const val=Number(i.slice(1))
      const targetpos={...o.pos,...(
      dir=='U'? {y:o.pos.y-val} :
      dir=='D'? {y:o.pos.y+val}:
      dir=='L'? {x:o.pos.x-val}:
          /*R*/ {x:o.pos.x+val})}
      const set=o.set
      let pos=o.pos;
      while(pos.x!=targetpos.x||pos.y!=targetpos.y){
        steps++;
        pos={...o.pos,...(
          dir=='U'? {y:o.pos.y--} :
          dir=='D'? {y:o.pos.y++}:
          dir=='L'? {x:o.pos.x--}:
              /*R*/ {x:o.pos.x++})}
        if(coords.has(`${pos.x},${pos.y}`)){
          const x=coords.get(`${pos.x},${pos.y}`)+steps
          if(!minsteps||x<minsteps)minsteps=x
        }
      }
      return {pos:targetpos,minsteps,steps}
    },{pos:{x:0,y:0},minsteps:null,steps:0}).minsteps
  }
}