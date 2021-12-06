// This was my original go at Day 6,
//  where I stored fish as objects in
//  an array. This approach quickly ran
//  out of memory, so I did a re-write

class Lanternfish {
  constructor(pool,timer=8){
    // refers to the sea, used for birthing
    this.pool = pool
    pool.push(this)
    this.timer = timer
  }
  tick(){
    if(this.timer == 0) this.birth()
    else this.timer--
  }
  birth(){
    new Lanternfish(this.pool)
    this.timer = 6
  }
}

const part1 = input => {
  const fishes = []
  input.split(',').forEach(f=>new Lanternfish(fishes,Number(f)))
  //console.log(input)
  for(let i = 0;i<80;i++){
    fishes.forEach(fish=>fish.tick())
    //console.log(`Day ${i+1} - ${fishes.map(fish=>fish.timer).join(',')}`)
  }
  return fishes.length
}

// went a bit weird with this one

module.exports = {part1}
