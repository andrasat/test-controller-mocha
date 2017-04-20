const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const mongoose = require('mongoose')
const Memo = require('../models/memo')
const server = require('../server')

chai.use(chaiHttp)

describe('Memo Test', ()=> {
let currentTest

  beforeEach((done)=> {
    new Memo({
      title: 'Test 1',
      content: 'Test 1 memo for a good app'
    }).save((err, data)=> {
      if(err) {
        console.log(err)
      } else {
        currentTest = data
        done()
      }
    })
  })

  afterEach((done)=> {
    Memo.collection.remove({})
    currentTest = ''
    done()
  })

  it('Should read all memo from database', function(done) {
    chai.request(server)
      .get('/api')
      .end(function(err, res) {
        res.should.have.status(200)
        res.body.should.be.a('array')
        done()
      })
  })

  it('Should create a memo in database', (done)=> {
    chai.request(server)
      .post('/api')
      .send({
        title: 'Test Memo',
        content: 'Text content memo'
      })
      .end((err,res)=> {
        res.should.have.status(200)
        res.body.title.should.equal('Test Memo')
        res.body.content.should.equal('Text content memo')
        done()
      })
  })

  it('Should update 1 item in database', (done)=> {
    chai.request(server)
      .put('/api/'+currentTest._id)
      .send({
        title: 'Test 2',
        content: 'Test 1 berubah jadi test 2'
      })
      .end((err,res)=> {
        res.should.have.status(200)
        res.body.should.have.property('title')
        res.body.title.should.equal('Test 2')
        res.body.content.should.equal('Test 1 berubah jadi test 2')
        done()
      })
  })

  it('Should delete 1 item in database', (done)=> {
    chai.request(server)
      .delete('/api/'+currentTest._id)
      .end((err,res)=> {
        res.should.have.status(200)
        res.body.should.have.property('title')
        res.body.should.have.property('content')
        done()
      })
  })
})