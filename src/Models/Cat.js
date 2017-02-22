export default class Cat {
  constructor() {
    this.hungry = 0
  }
  feed(food) {
    this.hungry += food
  }
  isHungry() {
    return this.hungry <= 20
  }
  isFulfill() {
    return this.hungry >= 100
  }
  getFood() {
    return this.hungry
  }
  setFood(food) {
    this.hungry = food
  }
}
