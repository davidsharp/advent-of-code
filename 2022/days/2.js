const matchUp = {
  // loss,draw,win
  A: ['Z','X','Y'],
  B: ['X','Y','Z'],
  C: ['Y','Z','X'],
}

const part1 = input => input.split('\n').map(
  game => {
    const [p1,p2] = game.split(' ')
    let score = matchUp[p1].findIndex(x=>x==p2) * 3
    score += p2.charCodeAt()-87
    return score
  }
).reduce((a,c)=>a+c)

const part2 = input => input.split('\n').map(
  game => {
    const [p1,outcome] = game.split(' ')
    // -1 for loss, 0 for draw, 1 for win
    const choice = outcome.charCodeAt()-89
    const p2 = ((3+(parseInt(p1,16)-10)+choice)%3)+1
    const score = p2 + ((outcome.charCodeAt()-88)*3)
    return score
  }
).reduce((a,c)=>a+c)

module.exports = {part1, part2}