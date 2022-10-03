const express = require('express');
const router = express.Router();

//Ajout du middleware 
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//on l'envoi vers controller sauce.js
const postCtrl = require('../controllers/sauce');

router.get('/', auth, postCtrl.getAllPosts);
router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/:id/like', auth, postCtrl.likePost)

module.exports = router;