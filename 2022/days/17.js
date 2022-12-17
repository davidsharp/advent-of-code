const rocks = `####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##`.split('\n\n').map(r=>r.split('\n'))

const w = 7
let h = 0 // highest rock, 0 is row that touches the floor

const part1 = pattern => {
  let count = 0
  let rIndex = 0
  let jIndex = 0
  const setRocks = new Set()
  while(count<2022){
    const r = rocks[rIndex%5]
    let x = 2
    let y = h + 3 //bottom of rock from the floor
    //console.log(r)
    let landed = false
    while(!landed){
      //console.log(x,y)
      //jet
      const d = pattern[jIndex%pattern.length]=='<'?-1:1
      // wall check (equality, because length-1)
      if(x+d>=0&&x+d+r[0].length<=7){
        // rock check
        let hit = false
        r.forEach((row,i)=>{
          [...row].forEach((cell,ii)=>{
            if(cell == '#'){
              hit = setRocks.has([x+ii+d,y+(r.length-1)-i].join(',')) || hit
            }
          })
        })
        if(!hit)x+=d
      }
      //console.log(d==1?'>':'<',x)
      // else no-op
      jIndex++
      //move down
      let hit = false
      let moved = false
      if(y>0){
        // rock check
        r.forEach((row,i)=>{
          [...row].forEach((cell,ii)=>{
            if(cell == '#'){
              hit = setRocks.has([x+ii,y+(r.length-1)-i-1].join(',')) || hit
            }
          })
        })
        if(!hit){
          y--
          moved = true
        }
      }
      if(!moved || hit) {
        landed = true
        r.forEach((row,i)=>{
          [...row].forEach((cell,ii)=>{
            if(cell == '#'){
              setRocks.add([x+ii,y+(r.length-1)-i].join(','))
            }
          })
        })
      }
    }
    if(y+r.length>h) h=y+r.length
    rIndex++
    count++
    //console.log(setRocks)
  }

  return h
}

module.exports = {part1}
