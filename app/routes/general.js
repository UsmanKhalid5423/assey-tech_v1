const router = require('express').Router();
const generalController = require('../controllers/general')

router.post('/contactus',generalController.contactUs)
router.get('/subscribe',generalController.subscribe)

module.exports = router;