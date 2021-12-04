const part1 = input => {
  let [numbers,...boards] = input.split('\n\n')

  numbers=numbers.split(',').map(Number)

  boards = boards.map(
    board => board.split('\n').map(
      line=>line.split(' ').filter(x=>x.length).map(x=>({value:Number(x),marked:false}))
    )
  )

  let winner = null
  let called = -1;
  while(winner===null){
    const calledNumber = numbers[++called]
    boards.forEach(
      board => {
        board.forEach(line => line.forEach(
          num => {if(num.value==calledNumber)num.marked=true}
        ))
      }
    )

    boards.forEach(
      (board,i) => {
        // check columns, bleh
        let winningColumn = false
        for(let col = 0; col < 5; col++){
          if(
            board[0][col].marked == true &&
            board[1][col].marked == true &&
            board[2][col].marked == true &&
            board[3][col].marked == true &&
            board[4][col].marked == true
          ) winningColumn = true
        }
        // check rows
        const winningRow = board.reduce((acc,line)=>{
          if(acc) return acc;
          return line.filter(num=>num.marked==false).length===0
        },false)
        if(winningColumn||winningRow)winner = i
      }
    )
  }


  const winnerSum = boards[winner].flat(Infinity).filter(num=>!num.marked).reduce(((acc,num)=>acc+num.value),0)

  return winnerSum * numbers[called]
}

const part2 = input => {
  let [numbers,...boards] = input.split('\n\n')

  numbers=numbers.split(',').map(Number)

  boards = boards.map(
    board => board.split('\n').map(
      line=>line.split(' ').filter(x=>x.length).map(x=>({value:Number(x),marked:false}))
    )
  )

  let winner = null // not the first winner, the _last_ winner
  let called = -1;
  let nonWinners = boards.map((c,i)=>i)
  while(winner == null){//nonWinners.length>1){
    const calledNumber = numbers[++called]
    boards.forEach(
      board => {
        board.forEach(line => line.forEach(
          num => {if(num.value==calledNumber)num.marked=true}
        ))
      }
    )

    boards.forEach(
      (board,i) => {
        // check columns, bleh
        let winningColumn = false
        for(let col = 0; col < 5; col++){
          if(
            board[0][col].marked == true &&
            board[1][col].marked == true &&
            board[2][col].marked == true &&
            board[3][col].marked == true &&
            board[4][col].marked == true
          ) winningColumn = true
        }
        // check rows
        const winningRow = board.reduce((acc,line)=>{
          if(acc) return acc;
          return line.filter(num=>num.marked==false).length===0
        },false)
        if(winningColumn||winningRow){
          if(nonWinners.length == 1) winner = i
          else nonWinners = nonWinners.filter(c=>c!=i)
        }
      }
    )
  }

  console.log(JSON.stringify(boards[winner],null,2))

  const winnerSum = boards[winner]//boards[nonWinners[0]]
    .flat(Infinity).filter(num=>!num.marked).reduce(((acc,num)=>acc+num.value),0)

  return winnerSum * numbers[called]
}

module.exports = {part1, part2}
