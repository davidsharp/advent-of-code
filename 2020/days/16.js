const parse = input => {
  let [rules,myTicket,tickets] = input.split('\n\n')
  return {
    rules:rules.split('\n').map(rule=>{
      const [key,value] = rule.split(': ')
      return [key,value.split(' or ').map(range=>range.split('-').map(Number))]
    }),
    myTicket:myTicket.split('\n')[1].split(',').map(Number),
    tickets:tickets.split('\n').slice(1).map(ticket=>ticket.split(',').map(Number))
  }
}

const part1 = input => {
  const {rules,myTicket,tickets} = parse(input)
  let invalidFields = []
  tickets.forEach(ticket=>{
    ticket.forEach(field=>{
      let valid = false
      for(let i=0;i<rules.length;i++){
        const [range1,range2] = rules[i]
        if(
          (field>=range1[0] && field<=range1[1]) &&
          field>=range2[0] && field<=range2[1]
        ) {
          valid = true
          break
        }
      }
      if(!valid)invalidFields.push(field)
    })
  })
  return invalidFields.reduce((a,b)=>a+b,0)
}

module.exports = {part1}