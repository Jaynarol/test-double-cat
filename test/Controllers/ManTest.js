import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import Man from '../../src/Controllers/Man'
import Cat from '../../src/Models/Cat'

describe('Man', () => {
  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    this.sinon = sandbox
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('feedThemAll()', () => {
    it('should return same food when nothing cat', () =>
      expect(Man.feedThemAll(100))
        .to.be.equal(100),
    )

    it('should food remain 10 when cat hungry 10', function () {
      const cat1 = new Cat()
      cat1.setFood(10)

      const stubFeedCat = this.sinon.stub(Man, 'feedCat')
        .returns(10)

      return expect(Man.feedThemAll(100, cat1))
        .to.be.equal(10)
        .and.satisfy(() => (
          sinon.assert.calledOnce(stubFeedCat)
        ) == null)
    })

    it('should food remain 10 when first cat not eat and second cat hungry 10', function () {
      const cat1 = new Cat()
      cat1.setFood(30)
      const cat2 = new Cat()
      cat2.setFood(10)

      const stubFeedCat = this.sinon.stub(Man, 'feedCat')
      stubFeedCat.onFirstCall().returns(100)
      stubFeedCat.onSecondCall().returns(10)

      return expect(Man.feedThemAll(100, cat1, cat2))
        .to.be.equal(10)
        .and.satisfy(() => (
          sinon.assert.calledTwice(stubFeedCat)
        ) == null)
    })

    it('should food remain 0 when all cat eat', function () {
      const cat1 = new Cat()
      cat1.setFood(10)
      const cat2 = new Cat()
      cat2.setFood(10)

      const stubFeedCat = this.sinon.stub(Man, 'feedCat')
      stubFeedCat.onFirstCall().returns(10)
      stubFeedCat.onSecondCall().returns(0)

      return expect(Man.feedThemAll(100, cat1, cat2))
        .to.be.equal(0)
        .and.satisfy(() => (
          sinon.assert.calledTwice(stubFeedCat)
        ) == null)
    })
  })


  describe('needFood()', () => {
    it('food should be 10 111', function () {
      const cat = new Cat()
      this.sinon.stub(Cat.prototype, 'getFood')
        .returns(90)

      return expect(Man.needFood(100, cat))
        .to.be.equal(10)
    })

    it('food should be 10 222', function () {
      const cat = new Cat()
      this.sinon.stub(Cat.prototype, 'getFood')
        .returns(10)

      return expect(Man.needFood(10, cat))
        .to.be.equal(10)
    })

    it('food should be 10 333', function () {
      const cat = new Cat()
      this.sinon.stub(Cat.prototype, 'getFood')
        .returns(10)

      return expect(Man.needFood(0, cat))
        .to.be.equal(0)
    })

    it('food should be 10 444', function () {
      const cat = new Cat()
      this.sinon.stub(Cat.prototype, 'getFood')
        .returns(100)

      return expect(Man.needFood(100, cat))
        .to.be.equal(0)
    })
  })
})
