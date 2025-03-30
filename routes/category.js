var express = require('express');
var router = express.Router();
let categorySchema = require('../schemas/category');

// Lấy danh sách tất cả categories
router.get('/', async function(req, res, next) {
  try {
    let categories = await categorySchema.find({});
    res.status(200).send({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

// Lấy một category theo ID
router.get('/:id', async function(req, res, next) {
  try {
    let category = await categorySchema.findById(req.params.id);
    if (!category) {
      return res.status(404).send({ success: false, message: 'Category không tồn tại' });
    }
    res.status(200).send({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

// Tạo mới một category
router.post('/', async function(req, res, next) {
  try {
    let newCategory = new categorySchema({
      name: req.body.name,
      description: req.body.description || ""
    });
    await newCategory.save();
    res.status(201).send({
      success: true,
      data: newCategory
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});

// Cập nhật category theo ID
router.put('/:id', async function(req, res, next) {
  try {
    let category = await categorySchema.findById(req.params.id);
    if (!category) {
      return res.status(404).send({ success: false, message: 'Category không tồn tại' });
    }

    if (req.body.name) category.name = req.body.name;
    if (req.body.description) category.description = req.body.description;

    await category.save();
    res.status(200).send({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});

// Xóa category theo ID
router.delete('/:id', async function(req, res, next) {
  try {
    let category = await categorySchema.findById(req.params.id);
    if (!category) {
      return res.status(404).send({ success: false, message: 'Category không tồn tại' });
    }

    await categorySchema.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: 'Category đã bị xóa'
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
