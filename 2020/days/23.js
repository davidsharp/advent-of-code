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
  let removed = [...cups,...cups].slice(currIdx+1,currIdx+1+3)
  let filtered = cups.filter(cup=>removed.indexOf(cup)<0)

  let destination = current
  do{
    destination = destination==1?9:destination-1
  }while(filtered.indexOf(destination)<0)
  let newIdx = filtered.indexOf(destination)
  let newCups = [
    ...filtered.slice(0,newIdx+1),
    ...removed,
    ...filtered.slice(newIdx+1)
  ]
  return {
    current:getIndex(newCups,newCups.indexOf(current)+1),
    cups:newCups
  }
}

/*
The crab picks up the three cups that are immediately clockwise of the current cup. They are removed from the circle; cup spacing is adjusted as necessary to maintain the circle.
The crab selects a destination cup: the cup with a label equal to the current cup's label minus one. If this would select one of the cups that was just picked up, the crab will keep subtracting one until it finds a cup that wasn't just picked up. If at any point in this process the value goes below the lowest value on any cup's label, it wraps around to the highest value on any cup's label instead.
The crab places the cups it just picked up so that they are immediately clockwise of the destination cup. They keep the same order as when they were picked up.
The crab selects a new current cup: the cup which is immediately clockwise of the current cup.
*/

const getIndex = (array,index) => array[(array.length+index)%array.length]

module.exports = {part1}

class Cup {
  constructor(id){

  }
}