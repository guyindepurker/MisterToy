const express = require('express')
const {addToy, getToys, deleteToy,getToy, updateToy} = require('./toy.controller')
const router = express.Router()
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getToys)
router.get('/:id', getToy)
router.put('/:id',requireAuth, requireAdmin, updateToy)
router.post('/', requireAuth, requireAdmin, addToy)
router.delete('/:id',requireAuth, requireAdmin, deleteToy)

module.exports = router