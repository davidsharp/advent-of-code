const part1 = input => {
  const rows = input.split('\n')
  const h = rows.length
  const w = rows[0].length
  const vis = rows.map(
    (row,y) => row.split('').map(
      (tree,x) => {
        if(x==0||y==0||x==w-1||y==h-1) return true
        // n/e/s/w
        else {
          // n
          let blocked = false
          let i = y
          while(--i>=0 && !blocked){
            if(tree<=rows[i][x])blocked = true
          }
          if(!blocked) return true
          // e
          blocked = false
          i = x
          while(++i<w && !blocked){
            if(tree<=rows[y][i])blocked = true
          }
          if(!blocked) return true
          // s
          blocked = false
          i = y
          while(++i<h && !blocked){
            if(tree<=rows[i][x])blocked = true
          }
          if(!blocked) return true
          // w
          blocked = false
          i = x
          while(--i>=0 && !blocked){
            if(tree<=rows[y][i])blocked = true
          }
          if(!blocked) return true
        }
        return false
      }
    )
  )
  return vis.flat().reduce((a,c)=>a+Number(c),0)
}

const part2 = input => {
  const rows = input.split('\n')
  const h = rows.length
  const w = rows[0].length
  const vis = rows.map(
    (row,y) => row.split('').map(
      (tree,x) => {
        if(x==0||y==0||x==w-1||y==h-1) return 0
        // n/e/s/w
        else {
          let s = 0
          // n
          let blocked = false
          let i = y
          while(--i>=0 && !blocked){
            if(tree<=rows[i][x])blocked = true
          }
          s = y-i-1
          // e
          blocked = false
          i = x
          while(++i<w && !blocked){
            if(tree<=rows[y][i])blocked = true
          }
          s *= i-x-1
          // s
          blocked = false
          i = y
          while(++i<h && !blocked){
            if(tree<=rows[i][x])blocked = true
          }
          s *= i-y-1
          // w
          blocked = false
          i = x
          while(--i>=0 && !blocked){
            if(tree<=rows[y][i])blocked = true
          }
          s *= x-i-1

          return s
        }
      }
    )
  )

  return vis.flat().reduce((a,c)=>a>c?a:Number(c),0)
}

module.exports = {part1, part2}