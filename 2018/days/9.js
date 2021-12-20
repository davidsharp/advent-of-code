module.exports = {
  part1: data => {
    let [playerCount, lastMarble] = data.match(/\d+/g).map(x=>parseInt(x))
    let marbleToPlay=1; // first is implied
    let currentMarble={value:0};
    currentMarble.next=currentMarble;
    currentMarble.prev=currentMarble;
    let players=(new Array(playerCount)).fill(0);
    while(marbleToPlay<=lastMarble){
      //console.log(currentMarble)
      if((marbleToPlay%23)!=0){
        const newMarble={value:marbleToPlay,next:currentMarble.next.next,prev:currentMarble.next}
        currentMarble.next.next.prev = newMarble
        currentMarble.next.next = newMarble
        currentMarble = newMarble
      }
      else{
        const removedMarble = currentMarble.prev.prev.prev.prev.prev.prev.prev
        removedMarble.prev.next=removedMarble.next
        removedMarble.next.prev=removedMarble.prev
        players[marbleToPlay%players.length] += (marbleToPlay+removedMarble.value)
        currentMarble = removedMarble.next
      }
      marbleToPlay++
    }
    return Math.max(...players)
  },
  part2: data => {
    let [playerCount, lastMarble] = data.match(/\d+/g).map(x=>parseInt(x))
    return days[9].part1([playerCount,lastMarble*100].join(','))
  }
}