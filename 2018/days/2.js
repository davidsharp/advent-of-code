module.exports = {
  // bleh
  part1: data => {
    const [twos,threes] = data.split('\n').reduce((a,b)=>{
      const str = [...b].sort().join('')
      const r4 = /([a-z])\1\1\1/i
      const r3 = /([a-z])\1\1/i
      const r2 = /([a-z])\1/i
      const fouredStr = str.replace(r4,'')
      const threedStr = str.replace(r3,'')
      return [
        a[0]+(r2.test(threedStr)?1:0),
        a[1]+(r3.test(fouredStr)?1:0)
      ]
    },
    [0,0])
    return twos*threes
  },
  // less bleh? oh, wait... a break statement...
  part2: data => {
    const makeMessyRegExp = s => {
      // like 'hrllo'.match(new RegExp('^(.{0}h.{4}|.{1}e.{3})$','g'))
      return s.split('').map((c,i,a)=>new RegExp(`^.{${i}}${c}.{${a.length-1-i}}$`,'g')
      )
    }
    let arr = data.split('\n')
    let regArr = arr.map(makeMessyRegExp)
    let similarStrings = []
    loop:
    for (let i=0;i<arr.length;i++) {
      const s = arr[i]
      for (let j=0;j<regArr.length;j++) {
        const r = regArr[j]
        const matches = r.map(c=>s.match(c)).filter(c=>c)
        if(matches.length===s.length-1){
          similarStrings = [arr[i],arr[j]]
          break loop;
        } // else console.log(matches.length,':::',arr[i],':::',arr[j])
      }
    }
    return similarStrings
  }
}