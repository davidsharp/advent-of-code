const part1 = input => {
  const fs = {}
  const loc = []
  input.split('\n').map(x=>x.split(' '))
  .forEach(
    c => {console.log(c)
      if(c[0]=='$'){
        if(c[1]=='cd'){
          if(c[2]=='..')loc.pop()
          else loc.push(c[2])
        } // else ls
      }
      // else ls'ing
      else {
        if(!fs[loc.join('/')])fs[loc.join('/')]={}
        if(c[0]!='dir') fs[loc.join('/')][c[1]] = Number(c[0])
        else fs[loc.join('/')][c[1]] = 'dir'
      }
      console.log(loc)
    }
  )

  const sizes = {}
  read(fs,'/',sizes)

  return Object.entries(sizes).filter(x=>x[1]<=100_000).reduce((a,c)=>a+c[1],0)
}

const read = (fs,dir,obj) => {
  const size = Object.entries(fs[dir]).reduce(
    (a,[file,size]) => a+(size=='dir'?read(fs,`${dir}/${file}`,obj):size)
  ,0)

  obj[dir] = size
  return size
}

module.exports = {part1}
