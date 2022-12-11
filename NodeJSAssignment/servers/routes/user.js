const express = require('express');
const router = express.Router();
const userConteroller =require('../controllers/userController');

router.get('/',userConteroller.view);
router.get('/record',userConteroller.record);
router.post('/record',userConteroller.find);
router.get('/teacherVerification',userConteroller.teacherVerification);
router.get('/student',userConteroller.student);
router.post('/teacherAuth',userConteroller.teacherAuth);
router.get('/addResult',userConteroller.addResultForm);
router.post('/addResult',userConteroller.addResult);
router.get('/editResult/:roll',userConteroller.editResultForm);
router.post('/editResult/:roll',userConteroller.update);
router.get('/:roll',userConteroller.delete);

module.exports = router;