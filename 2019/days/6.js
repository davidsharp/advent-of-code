module.exports = {
  part1: data=>{
    const orbitTree = data.split('\n').reduce((map,orbit)=>{
      const [a,b] = orbit.split(')')
      map.set(a,{
        parent:map.has(a)&&map.get(a).parent||undefined,
        children:[...(map.has(a)&&map.get(a).children||[]),b]
      })
      map.set(b,{
        parent:a,
        children:[...(map.has(b)&&map.get(b).children||[])]
      })
      return map
    },new Map())
    let root = null;
    orbitTree.forEach((v,k)=>{if(!root&&!v.parent)root=orbitTree.get(k)})
    let orbitCount = 0;
    const crawl = ({ children },depth=0) => {
      children.forEach(c=>crawl(orbitTree.get(c),depth+1))
      orbitCount+=depth
    }
    crawl(root)
    return orbitCount
  },
  part2: data=>{
    const orbitTree = data.split('\n').reduce((map,orbit)=>{
      const [a,b] = orbit.split(')')
      map.set(a,{
        parent:map.has(a)&&map.get(a).parent||undefined,
        children:[...(map.has(a)&&map.get(a).children||[]),b]
      })
      map.set(b,{
        parent:a,
        children:[...(map.has(b)&&map.get(b).children||[])]
      })
      return map
    },new Map())
    let me = null;
    let santa = null;
    orbitTree.forEach((v,k)=>{
      if(k=='YOU')me=orbitTree.get(k)
      if(k=='SAN')santa=orbitTree.get(k)
    })
    const crawl = ({ parent },route=[]) => {
      return parent?crawl(orbitTree.get(parent),[...route,parent]):route
    }
    let transfers = null;
    const myRoute = crawl(me)
    const santaRoute = crawl(santa)
    while(!santaRoute.find(r=>r===myRoute[0])){
      myRoute.shift();
      transfers++;
    }
    transfers+=santaRoute.findIndex(r=>r===myRoute[0])
    return transfers
  }
}