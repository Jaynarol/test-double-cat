export default class Man {

  static feedThemAll(food, ...cats) {
    return cats.reduce((remainFood, cat) => this.feedCat(cat, remainFood), food)
  }

  static feedCat(cat, remainFood) {
    let myRemainFood = remainFood
    if (cat.isHungry()) {
      const needFood = this.needFood(myRemainFood, cat)
      myRemainFood += needFood
      cat.feed(needFood)
    }
    return myRemainFood
  }

  static needFood(remainFood, cat) {
    const food = cat.getFood()
    return (remainFood >= food && remainFood >= 100) ? (100 - food) : remainFood
  }

}
