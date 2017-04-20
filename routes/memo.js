const express = require('express')
const memo = require('../controllers/memo')
const router = express.Router()

/* API routes */
router.get('/', memo.findMemo)
router.get('/:id', memo.findOneMemo)
router.post('/', memo.createMemo)
router.put('/:id', memo.editMemo)
router.delete('/:id', memo.deleteMemo)

module.exports = router