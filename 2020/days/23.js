const parse = input => input.split('').map(Number)

const part1 = input => {
  const cups = parse(input)

  let current = cups[0]

  let state = {current,cups}

  for(let turn=1;turn<=100;turn++){
    state=takeTurn(state)
  }
  return /1\d+1/.exec([...state.cups,...state.cups].join(''))[0].slice(1,-1)
}
const takeTurn = ({current,cups}) => {
  let currIdx = cups.indexOf(current)
  let removed = currIdx+3<cups.length?
    cups.slice(currIdx+1,currIdx+4):
    cups.slice(currIdx+1).concat(cups.slice(0,((currIdx+3)%cups.length)+1))
  let filtered = currIdx+3<cups.length?
    cups.slice(0,currIdx+1).concat(cups.slice(currIdx+4)):
    cups.slice(0,currIdx+1).slice((currIdx+4)%cups.length)

  let destination = current
  do{
    destination = destination==1?cups.length:destination-1
  }while(filtered.indexOf(destination)<0)
  let newIdx = filtered.indexOf(destination)
  let newCups = [
    ...filtered.slice(0,newIdx+1),
    ...removed,
    ...filtered.slice(newIdx+1)
  ]
  //console.log(current)
  return {
    current:getIndex(newCups,newCups.indexOf(current)+1),
    cups:newCups
  }
}

const xpart2 = input => {
  const tenThru1mil = (new Array(1_000_000-9)).fill(0).map((c,i)=>i+10)

  const cups = parse(input).concat(
    tenThru1mil
  )

  let current = cups[0]

  let state = {current,cups}

  const start = performance.now()
  for(let turn=1;turn<=10_000_000;turn++){
    if(turn%100==0)console.log('turn',turn,/*state,*/`(${10_000_000-turn} left)`,Math.floor(performance.now()-start)/1000,'seconds')
    state=takeTurn(state)
  }
  let indexOf1 = state.cups.indexOf(1)
  return getIndex(state.cups,indexOf1+1)*getIndex(state.cups,indexOf1+2)
}

const part2 = input => {
  const turns = 10_000_000
  const tenThru1mil = (new Array(1_000_000-9)).fill(0).map((c,i)=>i+10)

  let cups = parse(input).concat(tenThru1mil).map(cup=>new Cup(cup))

  cups = cups.map((cup,i)=>{
    cup.next=getIndex(cups,i+1)
    return cup
  })

  const ref = new Map(cups.map(cup=>[cup.id,cup]))
  const takeTurn = takeTurn2(ref)

  let current = cups[0]

  const start = performance.now()
  for(let turn=1;turn<=turns;turn++){
    if(turns<100||turn%1000==0)console.log('turn',turn,`(${turns-turn} left)`,Math.floor(performance.now()-start)/1000,'seconds')
    current=takeTurn(current)
  }
  current=ref.get(1)
  return current.next.id * current.next.next.id
}

const takeTurn2 = ref => current => {
  let removed = current.next
  current.next = removed.next.next.next

  let removedIds = [
    removed.id,
    removed.next.id,
    removed.next.next.id
  ]
  let destination = current.id
  do{
    destination=destination==1?ref.size:destination-1
  }while(removedIds.indexOf(destination)>-1)
  const destinationCup = ref.get(destination)
  const oldDestNext = destinationCup.next
  destinationCup.next = removed
  destinationCup.next.next.next.next = oldDestNext
  return current.next
}

const { performance } = require('perf_hooks');

/*
The crab picks up the three cups that are immediately clockwise of the current cup. They are removed from the circle; cup spacing is adjusted as necessary to maintain the circle.
The crab selects a destination cup: the cup with a label equal to the current cup's label minus one. If this would select one of the cups that was just picked up, the crab will keep subtracting one until it finds a cup that wasn't just picked up. If at any point in this process the value goes below the lowest value on any cup's label, it wraps around to the highest value on any cup's label instead.
The crab places the cups it just picked up so that they are immediately clockwise of the destination cup. They keep the same order as when they were picked up.
The crab selects a new current cup: the cup which is immediately clockwise of the current cup.
*/

const getIndex = (array,index) => array[(array.length+index)%array.length]

module.exports = {part1,part2}

class Cup {
  constructor(id,{next=null}={}){
    this.id = id
    this.next = next
  }
}