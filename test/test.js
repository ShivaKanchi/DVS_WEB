//To make sure the contract works as it should
const DVS_WEB = artifacts.require('./DVS_WEB.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('DVS_WEB', ([deployer, author]) => {
  let dvs_web

  before(async () => {
    dvs_web = await DVS_WEB.deployed()
  })
  //to check it deploys
  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await dvs_web.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await dvs_web.name()
      assert.equal(name, 'DVS_WEB')
    })
  })
  //to check the behaviour of contract
  describe('videos', async () => {
    let result, videoCount
    const hash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'

    before(async () => {
      result = await dvs_web.uploadVideo(hash, 'Video title', { from: author })
      videoCount = await dvs_web.videoCount()
    })

    //check event
    it('creates videos', async () => {
      // SUCCESS
      assert.equal(videoCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), videoCount.toNumber(), 'id is correct')
      assert.equal(event.hash, hash, 'Hash is correct')
      assert.equal(event.title, 'Video title', 'title is correct')
      assert.equal(event.author, author, 'author is correct')

      // FAILURE: Video must have hash
      await dvs_web.uploadVideo('', 'Video title', { from: author }).should.be.rejected;

      // FAILURE: Video must have title
      await dvs_web.uploadVideo('Video hash', '', { from: author }).should.be.rejected;
    })

    //check from Struct
    it('lists videos', async () => {
      const video = await dvs_web.videos(videoCount)
      assert.equal(video.id.toNumber(), videoCount.toNumber(), 'id is correct')
      assert.equal(video.hash, hash, 'Hash is correct')
      assert.equal(video.title, 'Video title', 'title is correct')
      assert.equal(video.author, author, 'author is correct')
    })
  })
})