let Memo = require('../models/memo'),
    fail = {success: false, msg: 'mongoose query failed'}

module.exports = {

  findMemo: (req, res)=> {
    Memo.find({})
      .exec((err, memos)=> {
        if(err) {
          console.error(err)
          res.send(fail)
        } else {
          res.send({success: true, data: memos, msg: 'Data found'})
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
        res.send(fail)
      } else {
        res.send({success: true, data: memo, msg: 'Create success'})
      }
    })
  },
  findOneMemo: (req, res)=> {
    Memo.findOne({_id: req.params.id})
      .exec((err, memo)=> {
        if(err) {
          console.error(err)
          res.send(fail)
        } else {
          console.log('Data found :', memo)
          res.send({success: true, data: memo, msg: 'Data found'})
        }
      })
  },
  editMemo: (req, res)=> {
    Memo.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      content: req.body.content,
      updatedAt: new Date()
    }, (err, memo)=> {
      if(err) {
        console.error(err)
        res.send(fail)
      } else {
        console.log('Data updated')
        res.send({success: true, data: memo, msg:'Data updated'})
      }
    })
  },
  deleteMemo: (req, res)=> {
    Memo.findByIdAndRemove(req.params.id, (err, memo)=> {
      if(err) {
        console.error(err)
        res.send(fail)
      } else {
        console.log('Data removed')
        res.send({success: true, data: memo, msg: 'Data removed'})
      }
    })
  }
}