const parse = input => input.split('\n\n').map(_deck=>{
  const [player,...deck] = _deck.split('\n')
  return deck.map(Number)
})

const part1 = input => {
  const [player1,player2] = parse(input)

  while(player1.length>0&&player2.length>0){
    //console.log('player 1 :::',player1)
    //console.log('player 2 :::',player2)
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

  //console.log(player1.length>0?'player 1\'s':'player 2\'s','winning hand :::',winningHand)

  let score = 0
  for(let i = 0;i<winningHand.length;i++){
    const cardScore = ((winningHand.length-i)*winningHand[i])
    //console.log(cardScore)
    score+=cardScore
  }

  return score
}

const part2 = input => {
  const [player1,player2] = parse(input)
  return recursiveCombat(player1,player2)[0]
}

const recursiveCombat = (player1,player2) => {
  const player1Rounds = new Set()
  const player2Rounds = new Set()

  //console.log(player1,player2)

  while(player1.length>0&&player2.length>0){
    //console.log('player 1 :::',player1)
    //console.log('player 2 :::',player2)

    const p1Round = player1.join(',')
    const p2Round = player2.join(',')

    // had this round before?
    if(
      player1Rounds.has(p1Round) ||
      player2Rounds.has(p2Round)
    )return [calcScore(player1),1];

    const turn1 = player1.shift()
    const turn2 = player2.shift()

    // turn/length comparison
    if(turn1<=player1.length && turn2<=player2.length){
      const [,winner] = recursiveCombat(
        player1.slice(0,turn1),player2.slice(0,turn2)
      )
      if(winner==1)player1.push(turn1,turn2)
      else player2.push(turn2,turn1)
    } else {
      // normal combat
      if(turn1>turn2) player1.push(turn1,turn2)
      else player2.push(turn2,turn1)
    }

    player1Rounds.add(p1Round)
    player2Rounds.add(p2Round)
  }

  winningHand=player1.length>0?player1:player2

  //console.log(player1.length>0?'player 1\'s':'player 2\'s','winning hand :::',winningHand)
  const score = calcScore(winningHand)

  return [score,player1.length>0?1:2]
}

const calcScore = deck => {
  let score = 0
  for(let i = 0;i<deck.length;i++){
    const cardScore = ((deck.length-i)*deck[i])
    score+=cardScore
  }
  return score
}

module.exports = {part1,part2}