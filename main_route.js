var router = require('express').Router();
// import  other router from ./routes folder

router.get('/', function (req, res, next) {
    res.send('hello-world')
})



module.exports = router
