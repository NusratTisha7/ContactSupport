const router = require('express').Router();
const { createSupport, getAllSupport, getOneSupport, editSupport, editIsReplied, deleteSupport } = require('../controllers/supportController')
const authorize = require('../middlewares/authorize');

router.route('/create')
    .post([authorize], createSupport)

router.route('/getAll')
    .get(getAllSupport)

router.route('/getOne')
    .get(getOneSupport)

router.route('/edit/:id')
    .put(editSupport)

router.route('/edit/reply/:id')
    .put(editIsReplied)

router.route('/delete/:id')
    .delete(deleteSupport)

module.exports = router;