const part1 = input => {
  const boardLength = 10
  const dieLength = 100
  const rollLength = 3
  const goal = 1000

  // player positions
  let players = input.split('\n')
    .map(line=>({
      score:0,
      // board is 1-indexed, so minus 1 (and wrap)
      position:(boardLength+Number(line.split(': ')[1])-1)%boardLength
    }))

  let rolls = 0
  let dieValue = -1 // slight off-by-one hack
  let playerTurn = 0 // 0 = p1, 1 = p2

  while(players[0].score<goal && players[1].score<goal){
    let _rolls = 0
    let rollValue = 0
    while(_rolls<rollLength){
      dieValue = (dieValue+1)%dieLength
      // die is 1-indexed, so add 1
      rollValue += (dieValue+1)
      _rolls++
    }
    rolls+=_rolls
    players[playerTurn].position += rollValue
    players[playerTurn].position %= boardLength
    // board is 1-indexed, so plus 1
    players[playerTurn].score += (players[playerTurn].position+1)
    playerTurn = (playerTurn+1)%2
  }

  return Math.min(players[0].score,players[1].score)*rolls

}

module.exports = {part1}
