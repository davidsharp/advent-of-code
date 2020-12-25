const parse = input => input.split('\n').map(Number)

const part1 = input => {
  const [card,door] = parse(input)
  const magicNo = 20201227
  const cardLoops = [1]
  //const doorLoops = [1]
  while(
    cardLoops[cardLoops.length-1]!=card
  ){
    let cardKey = (cardLoops[cardLoops.length-1]*7)%magicNo
    cardLoops.push(cardKey)
  }
  /*
  while(
    doorLoops[doorLoops.length-1]!=card
  ){
    let doorKey = (doorLoops[doorLoops.length-1]*7)%magicNo
    doorLoops.push(doorKey)
  }
  while(
    cardLoops.filter(x=>doorLoops.indexOf(x)>-1).length<2 // 1 is in both
  ){
    let cardKey = (cardLoops[cardLoops.length-1]*card)%magicNo
    let doorKey = (doorLoops[doorLoops.length-1]*door)%magicNo

    cardLoops.push(cardKey)
    doorLoops.push(doorKey)
  }
  */

  let value = 1;
  for(let i=1;i<cardLoops.length;i++){
    value = (value*door)%magicNo
  }

  //const matchingLoops = cardLoops.filter(x=>doorLoops.indexOf(x)>-1)
  //return matchingLoops[1]
  return value
}

module.exports = {part1}

/*
15335876
15086442
*/