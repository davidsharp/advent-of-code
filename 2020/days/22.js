const parse = input => input.split('\n\n').map(_deck=>{
  const [player,...deck] = _deck.split('\n')
  return deck.map(Number)
})

const part1 = input => {
  const [player1,player2] = parse(input)

  while(player1.length>0&&player2.length>0){
    console.log('player 1 :::',player1)
    console.log('player 2 :::',player2)
    const turn1 = player1.shift()
    const turn2 = player2.shift()
    if(turn1>turn2){
      player1.push(turn1,turn2)
    }
    else{
      player2.push(turn2,turn1)
    }
  }

  winningHand=player1.length>0?player1:player2

  console.log(player1.length>0?'player 1\'s':'player 2\'s','winning hand :::',winningHand)

  let score = 0
  for(let i = 0;i<winningHand.length;i++){
    const cardScore = ((winningHand.length-i)*winningHand[i])
    //console.log(cardScore)
    score+=cardScore
  }

  return score
}

module.exports = {part1}