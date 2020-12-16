const parse = input => {
  let [rules,myTicket,tickets] = input.split('\n\n')
  return {
    rules:rules.split('\n').map(rule=>{
      const [key,value] = rule.split(': ')
      return [key,value.split(' or ').map(range=>range.split('-').map(Number))]
    }),//.filter(rule=>/departure/gi.test(rule[0])),
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
        const [range1,range2] = rules[i][1]
        if(
          (field>=range1[0] && field<=range1[1]) ||
          (field>=range2[0] && field<=range2[1])
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

const part2 = input => {
  const {rules,myTicket,tickets} = parse(input)
  const validTickets = tickets.filter(ticket=>{
    return ticket.length == ticket.map(field=>{
      let valid = false
      for(let i=0;i<rules.length;i++){
        const [range1,range2] = rules[i][1]
        if(
          (field>=range1[0] && field<=range1[1]) ||
          (field>=range2[0] && field<=range2[1])
        ) {
          valid = true
          break
        }
      }
      return valid
    }).filter(valid=>valid).length
  })
  let fields = new Array(myTicket.length).fill(false)
  while(fields.findIndex(field=>!field)>-1){
    console.log(fields)
    fields.forEach((field,i)=>{
      if(field) return field
      let matchingField = [];
      for(let j=0;j<rules.length;j++){
        if(!fields.find(field=>field==rules[j][0])){
        const [range1,range2] = rules[j][1]
        isMatchingField = validTickets.reduce((a,ticket)=>(
          a&&(
            (ticket[i]>=range1[0] && ticket[i]<=range1[1]) ||
            (ticket[i]>=range2[0] && ticket[i]<=range2[1])
          )
        ),true)
        if(isMatchingField){
          matchingField = [...matchingField,rules[j][0]]
        }
        }
      }
      //console.log(matchingField)
      if(matchingField&&matchingField.length==1)fields[i]=matchingField[0]
    })
  }
  console.log(fields)
  return fields.reduce((a,field,i)=>/departure/gi.test(field)?a+myTicket[i]:a,0)
}

module.exports = {part1,part2}