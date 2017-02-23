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

  afterEach(() => {
    sandbox.restore()
  })

  describe('feedCat()', function () {
    it('should have food 100 then cat hungry reMainFood 10', function () {
      this.sinon.stub(Cat.prototype, 'isHungry').returns(true)
      const spyNeedFood = this.sinon.stub(Man, 'needFood').returns(90)
      this.sinon.stub(Cat.prototype, 'feed')
      const food = 100
      const remainFood = 10

      return expect(Man.feedCat(new Cat(), food))
        .to.be.equal(remainFood)
        .and.satisfy(() => (
          sinon.assert.calledOnce(spyNeedFood)
        ) == null)
    })

    it('should have food 100 then cat not hungry not eat reMainFood 100', function () {
      this.sinon.stub(Cat.prototype, 'isHungry').returns(false)
      this.sinon.stub(Man, 'needFood').returns(80)
      const spyFeed = this.sinon.stub(Cat.prototype, 'feed')
      const food = 100
      const remainFood = 100

      return expect(Man.feedCat(new Cat(), food))
        .to.be.equal(remainFood)
        .and.satisfy(() => (
          sinon.assert.notCalled(spyFeed)
        ) == null)
    })

    it('should have food 0 then cat hungry eat reMainFood 0', function () {
      this.sinon.stub(Cat.prototype, 'isHungry').returns(true)
      const spyNeedFood = this.sinon.stub(Man, 'needFood').returns(0)
      this.sinon.stub(Cat.prototype, 'feed')
      const food = 0
      const remainFood = 0

      return expect(Man.feedCat(new Cat(), food))
        .to.be.equal(remainFood)
        .and.satisfy(() => (
          sinon.assert.calledOnce(spyNeedFood)
        ) == null)
    })

    it('should have food 101 then cat hungry  eat reMainFood 11', function () {
      this.sinon.stub(Cat.prototype, 'isHungry').returns(true)
      const spyNeedFood = this.sinon.stub(Man, 'needFood').returns(90)
      this.sinon.stub(Cat.prototype, 'feed')
      const food = 101
      const remainFood = 11

      return expect(Man.feedCat(new Cat(), food))
        .to.be.equal(remainFood)
        .and.satisfy(() => (
          sinon.assert.calledOnce(spyNeedFood)
        ) == null)
    })

    it('should have food -1 then cat hungry  eat reMainFood 0', function () {
      this.sinon.stub(Cat.prototype, 'isHungry').returns(true)
      const spyNeedFood = this.sinon.stub(Man, 'needFood').returns(0)
      this.sinon.stub(Cat.prototype, 'feed')
      const food = -1
      const remainFood = 0

      return expect(Man.feedCat(new Cat(), food))
        .to.be.equal(remainFood)
        .and.satisfy(() => (
          sinon.assert.calledOnce(spyNeedFood)
        ) == null)
    })


    it('should have food Infinity then cat hungry  eat reMainFood 0', function () {
      this.sinon.stub(Cat.prototype, 'isHungry').returns(true)
      const spyNeedFood = this.sinon.stub(Man, 'needFood').returns(0)
      this.sinon.stub(Cat.prototype, 'feed')
      const food = Infinity
      const remainFood = 0

      return expect(Man.feedCat(new Cat(), food))
        .to.be.equal(remainFood)
        .and.satisfy(() => (
          sinon.assert.calledOnce(spyNeedFood)
        ) == null)
    })

    it('should have food 1000 then cat hungry  eat reMainFood 0', function () {
      this.sinon.stub(Cat.prototype, 'isHungry').returns(true)
      const spyNeedFood = this.sinon.stub(Man, 'needFood').returns(1000)
      this.sinon.stub(Cat.prototype, 'feed')
      const food = 1000
      const remainFood = 0

      return expect(Man.feedCat(new Cat(), food))
        .to.be.equal(remainFood)
        .and.satisfy(() => (
          sinon.assert.calledOnce(spyNeedFood)
        ) == null)
    })
  })
})
