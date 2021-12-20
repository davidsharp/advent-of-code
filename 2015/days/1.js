const part1 = input => input.split('').reduce(
  (floor,inst) => floor+=(inst=='('?1:-1)
,0)
const part2 = input => input.split('').reduce(
  ({floor,minusOnePos},inst,i) => {
    if(minusOnePos)return{minusOnePos}
    floor+=(inst=='('?1:-1)
    if(floor==-1)return{minusOnePos:i+1}
    return {floor}
  }
,{floor:0}).minusOnePos

module.exports = {part1,part2}
