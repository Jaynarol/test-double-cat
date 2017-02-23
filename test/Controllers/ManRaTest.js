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
    it('should food remain 60 from 100 when cat hungry 60', function () {
      this.sinon.stub(Cat.prototype, 'isHungry').returns(true)
      this.sinon.stub(Cat.prototype, 'feed')
      const stubNeedFood = this.sinon.stub(Man, 'needFood').returns(40)
      const food = 100
      const remainFood = 60

      return expect(Man.feedCat(new Cat(), food))
        .to.be.equal(remainFood)
        .and.satisfy(() => (
          sinon.assert.calledOnce(stubNeedFood)
        ) == null)
    })

    it('should food not reduce when cat not hungry', function () {
      this.sinon.stub(Cat.prototype, 'isHungry').returns(false)
      const spyNeedFood = this.sinon.spy(Man, 'needFood')
      const food = 100
      const remainFood = 100

      return expect(Man.feedCat(new Cat(), food))
        .to.be.equal(remainFood)
        .and.satisfy(() => (
          sinon.assert.notCalled(spyNeedFood)
        ) == null)
    })

    it('should food remain 0 from 10 when cat hungry 10', function () {
      this.sinon.stub(Cat.prototype, 'isHungry').returns(true)
      this.sinon.stub(Cat.prototype, 'feed')
      const stubNeedFood = this.sinon.stub(Man, 'needFood').returns(10)
      const food = 10
      const remainFood = 0

      return expect(Man.feedCat(new Cat(), food))
        .to.be.equal(remainFood)
        .and.satisfy(() => (
          sinon.assert.calledOnce(stubNeedFood)
        ) == null)
    })

    it('should food remain 0 from 0 when cat hungry 10', function () {
      this.sinon.stub(Cat.prototype, 'isHungry').returns(true)
      this.sinon.stub(Cat.prototype, 'feed')
      const stubNeedFood = this.sinon.stub(Man, 'needFood').returns(0)
      const food = 0
      const remainFood = 0

      return expect(Man.feedCat(new Cat(), food))
        .to.be.equal(remainFood)
        .and.satisfy(() => (
          sinon.assert.calledOnce(stubNeedFood)
        ) == null)
    })

    it('should food remain 55 from 140 when cat hungry 15', function () {
      this.sinon.stub(Cat.prototype, 'isHungry').returns(true)
      this.sinon.stub(Cat.prototype, 'feed')
      const stubNeedFood = this.sinon.stub(Man, 'needFood').returns(85)
      const food = 140
      const remainFood = 55

      return expect(Man.feedCat(new Cat(), food))
        .to.be.equal(remainFood)
        .and.satisfy(() => (
          sinon.assert.calledOnce(stubNeedFood)
        ) == null)
    })
  })
})
