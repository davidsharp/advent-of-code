const enhance = (input,turns) => {
  let [algo,image] = input.split('\n\n')
  // remove wrapping on example algo
  algo = algo.split('\n').join('')

  // establishes a "background colour"
  //  based on whatever an empty pixel will equal
  let background = '.'

  // if the algo a pixel to white on 0 and black on 0b111111111
  // then the background flips each turn
  const flipEachTurn = algo[0]=='#' && algo[algo.length-1]=='.'

  image=image.split('\n').map(row=>row.split(''))

  while(turns-->0){
    // naively, we'll add a background layer 
    // of pixels around before each run
    image = [
      Array(image[0].length+2).fill(background),
      ...image.map(row=>[background,...row,background]),
      Array(image[0].length+2).fill(background),
    ]

    image = image.map(
      (row,y) => row.map((pix,x)=>(
        algo[readPixel(image,x,y,background)]
      ))
    )

    // flip background if needs be
    if(flipEachTurn){
      if(background == '#') background = '.'
      else background = '#'
    }
  }

  return image.reduce((acc,row)=>row.reduce((_acc,pix)=>_acc+(pix=='#'?1:0),acc),0)
}

const readPixel = (image,x,y,bg) => {
  // any undefined pixels will be the background colour
  let binary = parseInt([
    image?.[y-1]?.[x-1], image?.[y-1]?.[x], image?.[y-1]?.[x+1],
    image?.[y]?.[x-1],   image?.[y]?.[x],   image?.[y]?.[x+1],
    image?.[y+1]?.[x-1], image?.[y+1]?.[x], image?.[y+1]?.[x+1],
  ].map(bit=>(
    bit == '#'? 1:
    bit == '.'? 0:
    bg  == '#'? 1:
    /*bg = '.'*/0
  )).join(''),2)
  return binary
}

const part1 = input => enhance(input,2)
const part2 = input => enhance(input,50)

module.exports = {part1, part2}
