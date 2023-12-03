const part1 = input => {
  const re = /(\.|\d){3}/ // is 3 *non*-symbols
  const rows = input.split('\n')
  const nums = []
  rows.forEach(
    (row,i) => {
      const cols = [...row]
      let current_num = ''
      let is_adjacent = false
      for(let j = 0;j < cols.length;j++){
        if(Number(cols[j])){
          current_num = current_num + cols[j]
          console.log(
            cols[j],
            (rows[i-1] && !re.test(rows[i-1].substring(j-1,j+2).padEnd(3,'.'))) ,
            !re.test(rows[i].substring(j-1,j+2).padEnd(3,'.')) ,  // pad to handle row ends
            (rows[i+1] && !re.test(rows[i+1].substring(j-1,j+2).padEnd(3,'.')))
          )
          if(
            !is_adjacent && 
            (
              (rows[i-1] && !re.test(rows[i-1].substring(j-1,j+2).padEnd(3,'.'))) ||
              !re.test(rows[i].substring(j-1,j+2).padEnd(3,'.')) ||  // pad to handle row ends
              (rows[i+1] && !re.test(rows[i+1].substring(j-1,j+2).padEnd(3,'.')))
            )
          ){
            is_adjacent = true
          }
        }
        else {
          if(is_adjacent)
            nums.push(Number(current_num))
          current_num = ''
          is_adjacent = false
        }
      }
      // row end
      if(current_num.length > 0 && is_adjacent)
        nums.push(Number(current_num))
      current_num = ''
      is_adjacent = false
    }
  )
  return nums.reduce((a,b)=>a+b)
}

module.exports = { part1 }