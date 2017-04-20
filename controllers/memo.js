let Memo = require('../models/memo')

module.exports = {

  findMemo: (req, res)=> {
    Memo.find({})
      .exec((err, memos)=> {
        if(err) {
          console.error(err)
          res.send(err)
        } else {
          res.send(memos)
        }
      })
  },
  createMemo: (req, res)=> {
    new Memo({
      title: req.body.title,
      content: req.body.content,
      createdAt: new Date(),
      updatedAt: new Date()
    }).save((err, memo)=> {
      if(err) {
        console.error(err)
        res.send(err)
      } else {
        res.send(memo)
      }
    })
  },
  findOneMemo: (req, res)=> {
    Memo.findOne({_id: req.params.id})
      .exec((err, memo)=> {
        if(err) {
          console.error(err)
          res.send(err)
        } else {
          console.log('Data found :', memo)
          res.send(memo)
        }
      })
  },
  editMemo: (req, res)=> {
    Memo.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      content: req.body.content,
      updatedAt: new Date()
    }, {new: true}, (err, memo)=> {
      if(err) {
        console.error(err)
        res.send(err)
      } else {
        console.log('Data updated')
        res.send(memo)
      }
    })
  },
  deleteMemo: (req, res)=> {
    Memo.findByIdAndRemove(req.params.id, (err, memo)=> {
      if(err) {
        console.error(err)
        res.send(err)
      } else {
        console.log('Data removed')
        res.send(memo)
      }
    })
  }
}