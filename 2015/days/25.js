const part1 = input => {
  const [row,column] = input.replaceAll(/[^0-9,]/g,'').split(',')
  let [x,y] = [1,1]
  let value = 20151125
  const multiplier = 252533
  const modBy = 33554393
  let topY = 1
  while(x != column || y != row){
    // top row
    if(y-1==0){
      x = 1
      y = ++topY
    } else {
      x++
      y--
    }

    value = (value * multiplier) % modBy
  }

  return value
}

module.exports = {part1}
