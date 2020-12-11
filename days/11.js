const parse = input => input.split('\n')

const part1 = input => {
  const seats = parse(input)
  let state = seats
  let prevState = null
  do{
    prevState=[...state]
    state = state.map(
      (row,y)=>{
        return row.split('').map((seat,x)=>{
          if(seat=='L'){
            if(prevState[y-1]){
              const above = prevState[y-1].substring(x-1,x+2)
              if(/#/.test(above)) return 'L';
            }
            if(prevState[y]){
              if(prevState[y][x-1]&&prevState[y][x-1]=='#') return 'L';
              if(prevState[y][x+1]&&prevState[y][x+1]=='#') return 'L';
            }
            if(prevState[y+1]){
              const below = prevState[y+1].substring(x-1,x+2)
              if(/#/.test(below)) return 'L';
            }
            return '#';
          }
          else if(seat=='#'){
            let count = 0;
            if(prevState[y-1]){
              const above = prevState[y-1].substring(x-1,x+2)
              count+=(above.split('#').length-1)
            }
            if(prevState[y]){
              if(prevState[y][x-1]&&prevState[y][x-1]=='#') count++;
              if(prevState[y][x+1]&&prevState[y][x+1]=='#') count++;
            }
            if(prevState[y+1]){
              const below = prevState[y+1].substring(x-1,x+2)
              count+=(below.split('#').length-1)
            }
            return count>=4?'L':'#'
          }
          else return seat
        }).join('')
      }
    )
  }while(state.join('\n')!=prevState.join('\n'))
  return state.join('\n').split('#').length-1
}
const part2 = input => {}

module.exports = {part1,part2}

/*
If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
Otherwise, the seat's state does not change.
*/