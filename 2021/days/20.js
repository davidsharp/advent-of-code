const part1 = input => {
  let [algo,image] = input.split('\n\n')
  // remove wrapping on example algo
  algo = algo.split('\n').join('')

  // establishes a "background colour"
  //  based on whatever an empty pixel will equal
  const empty = algo[0]

  image=image.split('\n').map(row=>row.split(''))

  console.log('starting image:\n'+image.map(row=>row.join('')).join('\n'))

  let turns = 2

  while(turns-->0){
    // naively, we'll add an empty layer 
    // of pixels around before each run
    image = [
      Array(image[0].length+2).fill(empty),
      ...image.map(row=>[empty,...row,empty]),
      Array(image[0].length+2).fill(empty),
    ]

    image = image.map(
      (row,y) => row.map((pix,x)=>(
        algo[readPixel(image,x,y,empty)]
      ))
    )

    console.log('image:\n'+image.map(row=>row.join('')).join('\n'))
  }

  return image.reduce((acc,row)=>row.reduce((_acc,pix)=>_acc+(pix=='#'?1:0),acc),0)

}

const readPixel = (image,x,y,bg) => {
  const notEmpty = bg == '.'?'#':'.'
  let binary = parseInt([
    image?.[y-1]?.[x-1], image?.[y-1]?.[x], image?.[y-1]?.[x+1],
    image?.[y]?.[x-1],   image?.[y]?.[x],   image?.[y]?.[x+1],
    image?.[y+1]?.[x-1], image?.[y+1]?.[x], image?.[y+1]?.[x+1],
  ].map(bit=>bit==notEmpty?1:0).join(''),2)
  return binary
}

module.exports = {part1}
