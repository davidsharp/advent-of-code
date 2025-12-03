const part1 = input => input.split('\n').reduce((acc, b) => {
  let left = b.length-2
  for (let i = left; i >= 0; i--) {
    if (b[i] >= b[left]) {
      left = i
    }
  }
  let right = left + 1
  for (let i = right; i < b.length; i++) {
    if (b[i] >= b[right]) {
      right = i
    }
  }
  const j = Number(`${b[left]}${b[right]}`)
  return acc + j
},0)

module.exports = {part1}
