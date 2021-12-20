const part1 = input => input.split('').reduce(
  (floor,inst) => floor+=(inst=='('?1:-1)
,0)

module.exports = {part1}
