const {addMessage, getMessages} = require ('../controllers/messagesController');

const router = require ('express').Router ();

router.post('/addMessage', addMessage);
router.post('/getMessages', getMessages);

module.exports = router;