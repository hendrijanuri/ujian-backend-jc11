const express = require('express')
const router = express.Router()
const { categoryControllers } = require('../controllers')

// http://localhost:2020/category/getcategory
router.get('/getcategory', categoryControllers.getCategory)

// http://localhost:2020/category/getcategory/:params
router.get('/getcategory/:id', categoryControllers.getCategoryById)

// http://localhost:2020/category/deletecategory/:params
router.delete('/deletecategory/:id', categoryControllers.deleteCategory)

// http://localhost:2020/category/addcategory
router.post('/addcategory', categoryControllers.addCategory)

// http://localhost:2020/category/editcategory/:params
router.put('/editcategory/:id', categoryControllers.editCategory)

module.exports = router