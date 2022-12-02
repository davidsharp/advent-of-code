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
    //score += parseInt(p1,16)-9
    score += p2.charCodeAt()-87
    return score
  }
).reduce((a,c)=>a+c)

module.exports = {part1}