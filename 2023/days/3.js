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
        if(Number(cols[j]) > -1){ // test for NaN vs 0
          current_num = current_num + cols[j]
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

const part2 = input => {
  const rows = input.split('\n')
  const gears = {} // {"[x,y]": <Set>}
  rows.forEach(
    (row,i) => {
      const cols = [...row]
      let current_num = ''
      let seen_gears = new Set()
      for(let j = 0;j < cols.length;j++){
        if(Number(cols[j]) > -1){ // test for NaN vs 0
          current_num = current_num + cols[j]
          for(let r = i-1;r<(i+2);r++){
            if(rows[r]){
              for(let c = j-1;c<(j+2);c++){
                if(rows[r][c] == '*'){
                  seen_gears.add([c,r].join())
                }
              }
            }
          }
        }
        else {
          if(current_num)seen_gears.forEach(
            gear => {
              if(!gears[gear]) gears[gear] = new Set()
              gears[gear].add(current_num)
            }
          )
          current_num = ''
          seen_gears = new Set()
        }
      }
      // row end
      if(current_num)seen_gears.forEach(
        gear => {
          if(!gears[gear]) gears[gear] = new Set()
          gears[gear].add(current_num)
        }
      )
    }
  )
  return Object.values(gears).filter(gear=>gear.size==2).map(gear=>[...gear]).reduce((acc,[a,b])=>acc+(a*b),0)
}

module.exports = { part1, part2 }