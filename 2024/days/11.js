const part1 = input => {
  let stones = input.split(' ').map(Number)
  let blinks = 25
  while (blinks-- > 0) {
    stones = stones.flatMap(stone => {
      if(stone==0) return 1
      else if (stone.toString().length % 2 == 0) {
        const str = stone.toString()
        return [
          str.slice(0,str.length/2),
          str.slice(str.length/2)
          ].map(Number)
      }
      else return stone * 2024
    })
  }
  return stones.length
}

const part2 = input => {
  //const memo = new Map() //skip blinking processing?
  const toAdd = {} // toAdd[value][blinks] = number of
  // invert blinks and values?

  const blinks = 25
  let stones = input.split(' ').map(x=>[Number(x),blinks,1]) // [value,blinksRemaining,count]

  let count = 0
  while (stones.length > 0) {
    let stone = stones[0]
    while (stone[1]-- > 0) {
        if(stone[0]==0) stone[0] = 1
        else if (stone[0].toString().length % 2 == 0) {
          const str = stone[0].toString()
          stone[0] = Number(str.slice(0,str.length/2))
          const add = Number(str.slice(str.length / 2))
          const blinks = stone[1]
          if (!toAdd[add]) toAdd[add] = {}
          if (!toAdd[add][blinks]) toAdd[add][blinks] = 0
          toAdd[add][blinks]++
        }
        else stone[0] *= 2024
    }
    count += stone[2]
    stones.shift()
  }
  console.log(toAdd)
  return count
}


module.exports = {part1, part2}


/*
const mapStones = stone => {
  if(Array.isArray(stone)) return stone.map(mapStones)
  if(stone==0) return 1
  else if (stone.toString().length % 2 == 0) {
    const str = stone.toString()
    return [
      str.slice(0,str.length/2),
      str.slice(str.length/2)
      ].map(Number)
  }
  else return stone * 2024
}
const part2 = input => {
  let stones = input.split(' ').map(Number)
  let blinks = 25 // 75
  while (blinks-- > 0) {
    stones = stones.map(mapStones)
    console.log(blinks,stones.length)
  }
  return stones.reduce()
}
//
const part2 = input => {
  let stones = input.split(' ').map(Number)
  return stones.reduce((sum,firstStone) => {
    console.log('--',firstStone)
    let stones = [firstStone]
    let blinks = 75
    while (blinks-- > 0) {
      console.log(blinks)
      stones = stones.flatMap(stone => {
        if(stone==0) return 1
        else if (stone.toString().length % 2 == 0) {
          const str = stone.toString()
          return [
            str.slice(0,str.length/2),
            str.slice(str.length/2)
            ].map(Number)
        }
        else return stone * 2024
      })
    }
    return sum + stones.length
  },0)
}
//
class Stone {
  //leaf = true
  children = null
  depth = 0
  constructor(value,depth=0) {
    console.log('new stone!',value,depth)
    this.value = value
    this.depth = depth
  }
  blink() {
    if (this.children) {
      this.children.map(child=>child.blink())
    }
    else {
      if(this.value==0) return 1
      else if (this.value.toString().length % 2 == 0) {
        const str = this.value.toString()
        this.children = [
          str.slice(0,str.length/2),
          str.slice(str.length/2)
          ].map(x=>new Stone(Number(x),this.depth+1))
      }
      else return this.value * 2024
    }
  }
    // get leaf node count
  crawl(){
    if(!this.children) return 1
    else return this.children[0].crawl()+this.children[1].crawl()
  }
}
const part2 = input => {
  let stones = input.split(' ').map(x=>new Stone(Number(x)))
  let blinks = 25
  while (blinks-- > 0) {
    stones.forEach(stone=>stone.blink())
  }
  return stones.reduce((sum,stone)=>sum+stone.crawl(),0)
}
*/
