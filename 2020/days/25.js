const parse = input => input.split('\n').map(Number)

const part1 = input => {
  const [card,door] = parse(input)
  const magicNo = 20201227
  cardLoops = [1]
  doorLoops = [1]
  while(
    cardLoops.filter(x=>doorLoops.indexOf(x)>-1).length<2 // 1 is in both
  ){
    let cardKey = (cardLoops[cardLoops.length-1]*card)%magicNo
    let doorKey = (doorLoops[doorLoops.length-1]*door)%magicNo

    cardLoops.push(cardKey)
    doorLoops.push(doorKey)

    //console.log(cardLoops,doorLoops)
  }

  console.log(cardLoops,doorLoops)
  
  const matchingLoops = cardLoops.filter(x=>doorLoops.indexOf(x)>-1)
  console.log(matchingLoops)
  return matchingLoops[1]
}

module.exports = {part1}

/*
17807724
5764801
*/