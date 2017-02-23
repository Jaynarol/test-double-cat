/* eslint-disable prefer-arrow-callback */

import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import Man from '../../src/Controllers/Man'
import Cat from '../../src/Models/Cat'

describe('Man', function () {
  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    this.sinon = sandbox
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('feedThemAll()', function () {
    it('food should be not reduce when nothing cat', function () {
      const food = 100
      const remainFood = 100

      return expect(Man.feedThemAll(food))
          .to.be.equal(remainFood)
    })

    it('food should remain 10 from 100 when one cat hungry 10', function () {
      const stubFeedCat = this.sinon.stub(Man, 'feedCat').returns(10)
      const food = 100
      const remainFood = 10

      return expect(Man.feedThemAll(food, new Cat()))
        .to.be.equal(remainFood)
        .and.satisfy(() => (
          sinon.assert.calledOnce(stubFeedCat)
        ) == null)
    })

    it('food should remain 10 from 100 when first cat fulfill but second cat hungry 10', function () {
      const stubFeedCat = this.sinon.stub(Man, 'feedCat')
      stubFeedCat.onFirstCall().returns(100)
      stubFeedCat.onSecondCall().returns(10)
      const food = 100
      const remainFood = 10

      return expect(Man.feedThemAll(food, new Cat(), new Cat()))
        .to.be.equal(remainFood)
        .and.satisfy(() => (
          sinon.assert.calledTwice(stubFeedCat)
        ) == null)
    })

    it('food should remain 0 from 100 when all cat eating out', function () {
      const stubFeedCat = this.sinon.stub(Man, 'feedCat')
      stubFeedCat.onFirstCall().returns(10)
      stubFeedCat.onSecondCall().returns(0)
      const food = 100
      const remainFood = 0

      return expect(Man.feedThemAll(food, new Cat(), new Cat()))
        .to.be.equal(remainFood)
        .and.satisfy(() => (
          sinon.assert.calledTwice(stubFeedCat)
        ) == null)
    })
  })

  describe('needFood()', function () {
    it('needFood should be 10 when cat hungry 90 and remainFood is 100', function () {
      this.sinon.stub(Cat.prototype, 'getFood').returns(90)
      const food = 100
      const remainFood = 10

      return expect(Man.needFood(food, new Cat()))
        .to.be.equal(remainFood)
    })

    it('needFood should be 10 when cat hungry more than remainFood and remainFood is 10', function () {
      this.sinon.stub(Cat.prototype, 'getFood').returns(10)
      const food = 10
      const remainFood = 10

      return expect(Man.needFood(food, new Cat()))
        .to.be.equal(remainFood)
    })

    it('needFood should be 0 when remainFood empty', function () {
      this.sinon.stub(Cat.prototype, 'getFood').returns(10)
      const food = 0
      const remainFood = 0

      return expect(Man.needFood(food, new Cat()))
        .to.be.equal(remainFood)
    })

    it('needFood should be 0 when cat fulfill', function () {
      this.sinon.stub(Cat.prototype, 'getFood').returns(100)
      const food = 100
      const remainFood = 0

      return expect(Man.needFood(food, new Cat()))
        .to.be.equal(remainFood)
    })
  })

  describe('feedCat()', function () {
    it('remainfood should be 100 from 100 when cat not hungry', function () {
      this.sinon.stub(Cat.prototype, 'isHungry').returns(false)
      const spyCatFeed = this.sinon.spy(Cat.prototype, 'feed')
      const food = 100
      const remainFood = 100

      return expect(Man.feedCat(new Cat(), food))
        .to.be.equal(remainFood)
        .and.satisfy(() => (
          sinon.assert.notCalled(spyCatFeed)
        ) == null)
    })

    it('remainfood should be 0 from 100 when cat hungry and needFood 100', function () {
      this.sinon.stub(Cat.prototype, 'isHungry').returns(true)
      this.sinon.stub(Man, 'needFood').returns(100)
      const spyCatFeed = this.sinon.stub(Cat.prototype, 'feed')
      const food = 100
      const remainFood = 0

      return expect(Man.feedCat(new Cat(), food))
        .to.be.equal(remainFood)
        .and.satisfy(() => (
          sinon.assert.calledOnce(spyCatFeed)
        ) == null)
    })

    it('remainfood should be 100 from 200 when cat hungry and needfood 100', function () {
      this.sinon.stub(Cat.prototype, 'isHungry').returns(true)
      this.sinon.stub(Man, 'needFood').returns(100)
      const spyCatFeed = this.sinon.stub(Cat.prototype, 'feed')
      const food = 200
      const remainFood = 100

      return expect(Man.feedCat(new Cat(), food))
        .to.be.equal(remainFood)
        .and.satisfy(() => (
          sinon.assert.calledOnce(spyCatFeed)
        ) == null)
    })

    it('remainfood should be 120 from 200 when cat hungry and needfood 80', function () {
      this.sinon.stub(Cat.prototype, 'isHungry').returns(true)
      this.sinon.stub(Man, 'needFood').returns(80)
      const spyCatFeed = this.sinon.stub(Cat.prototype, 'feed')
      const food = 200
      const remainFood = 120

      return expect(Man.feedCat(new Cat(), food))
        .to.be.equal(remainFood)
        .and.satisfy(() => (
          sinon.assert.calledOnce(spyCatFeed)
        ) == null)
    })

    it('should remainfood is 0 from 20 when cat hungry and needfood 100', function () {
      this.sinon.stub(Cat.prototype, 'isHungry').returns(true)
      this.sinon.stub(Man, 'needFood').returns(20)
      const spyCatFeed = this.sinon.stub(Cat.prototype, 'feed')
      const food = 20
      const remainFood = 0

      return expect(Man.feedCat(new Cat(), food))
        .to.be.equal(remainFood)
        .and.satisfy(() => (
          sinon.assert.calledOnce(spyCatFeed)
        ) == null)
    })
  })
})
