export default class Man {

  static feedThemAll(food, ...cats) {
    return cats.reduce((remainFood, cat) => this.feedCat(cat, remainFood), food)
  }

  static feedCat(cat, remainFood) {
    let myRemainFood = remainFood
    if (cat.isHungry()) {
      const needFood = this.needFood(myRemainFood, cat)
      myRemainFood -= needFood
      cat.feed(needFood)
    }
    return myRemainFood
  }

  static needFood(remainFood, cat) {
    const catHungry = cat.getFood()
    const fulfillFood = 100
    return (remainFood >= catHungry && remainFood >= fulfillFood) ? (fulfillFood - catHungry) : remainFood
  }

}
