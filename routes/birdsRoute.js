const express=require('express');
const router=express.Router();
const CommonControllers=require('../controllers/Controllers');

// App routes
router.get('/',CommonControllers.animals);
router.get('/plants',CommonControllers.plants);
router.get('/birds',CommonControllers.birds);
router.get('/nature',CommonControllers.nature);

module.exports=router;