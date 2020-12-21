const parse = input => {
  return input.split('\n').map(food=>{
    let [ingredients,allergens] = food.split('(contains ').map(x=>x.match(/[a-z]+/g))
    return {ingredients,allergens}
  })
}

const part1 = input => {
  const allergens = {}
  let ingredients = new Set()
  const foods = parse(input)
  foods.forEach(food=>{
    ingredients = new Set([...ingredients,...food.ingredients])
    food.allergens.forEach((allergen) => {
      const ingredients = new Set(food.ingredients);
      if (allergen in allergens) {
        allergens[allergen] = new Set(
          [...allergens[allergen]].filter(x => ingredients.has(x))
        )
      }else{
        allergens[allergen] = ingredients;
      }
    });
    //console.log(food)
  })
  //console.log(ingredients)
  //console.log(allergens)
  let allergenIngreds = Object.values(allergens).reduce((a,b)=>new Set([...a,...b]),[])
  let safeIngredients = new Set(
    [...ingredients].filter(x => !allergenIngreds.has(x))
  )
  //console.log(safeIngredients)
  return foods.reduce((count,food)=>(
    count+food.ingredients.filter(ingr=>safeIngredients.has(ingr)).length
  ),0)
}

const part2 = input => {
  const allergens = {}
  let ingredients = new Set()
  const foods = parse(input)
  foods.forEach(food=>{
    ingredients = new Set([...ingredients,...food.ingredients])
    food.allergens.forEach((allergen) => {
      const ingredients = new Set(food.ingredients);
      if (allergen in allergens) {
        allergens[allergen] = new Set(
          [...allergens[allergen]].filter(x => ingredients.has(x))
        )
      }else{
        allergens[allergen] = ingredients;
      }
    });
    //console.log(food)
  })
  //console.log(ingredients)
  //console.log(allergens)
  let allergenEntries = Object.entries(allergens)
  while(allergenEntries.find(([,algn])=>algn.size>1)){
    allergenEntries.forEach(
      ([key,allergen])=>{
        if(allergen.size==1){
          // remove from others
          allergenEntries.forEach(([_key,_allergen],i)=>{
            if(key!==_key)allergenEntries[i]=[_key,new Set(
              [..._allergen].filter(x => !allergen.has(x))
            )]
          })
        }
      }
    )
  }
  console.log(allergenEntries)
  return allergenEntries.sort((a,b)=>a[0]>b[0]?1:-1).map(a=>[...a[1]][0]).join(',')
}


module.exports = {part1,part2}