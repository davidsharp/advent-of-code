module.exports = {
  part1: data=>data.split('\n').reduce((a,b)=>a+((b[0]=='+'?1:-1)*parseInt(b.slice(1))),0)
}