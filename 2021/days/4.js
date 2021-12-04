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
    //if(called == 1)console.log(JSON.stringify(boards,null,2))

    boards.forEach(
      (board,i) => {
        // check columns
        const winningColumn = null
        // check rows
        const winningRow = board.reduce((acc,line)=>{
          if(acc) return acc;
          return line.filter(num=>num.marked==false).length===0
        },false)
        if(winningColumn||winningRow)winner = i
      }
    )
  }

  console.log(winner)

  //console.log(numbers)
  //console.log(JSON.stringify(boards,null,2))
}

module.exports = {part1}
