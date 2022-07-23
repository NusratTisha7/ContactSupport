const router = require('express').Router();
const { login,createUser, getAllUser, getOneUser, editUser, deleteUser } = require('../controllers/userController')

router.route('/login')
    .post(login)

router.route('/create')
    .post(createUser)

router.route('/getAll')
    .get(getAllUser)

router.route('/getOne')
    .get(getOneUser)

router.route('/edit/:id')
    .put(editUser)

router.route('/delete/:id')
    .delete(deleteUser)

module.exports = router;