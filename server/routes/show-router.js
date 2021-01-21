const express = require('express')

const ShowCtrl = require('../controllers/show-ctrl')

const router = express.Router()

router.post('/show', ShowCtrl.createShow)
router.put('/show/:id', ShowCtrl.updateShow)
router.delete('/show/:id', ShowCtrl.deleteShow)
router.get('/show/:id', ShowCtrl.getShowById)
router.get('/shows', ShowCtrl.getShows)

module.exports = router
