const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Trang danh sách sản phẩm
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.render('index', { products });
});

// Trang chi tiết sản phẩm
router.get('/product/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('product', { product });
});

// Thêm sản phẩm vào giỏ hàng (giả sử sử dụng session)
router.post('/cart/add/:id', (req, res) => {
    const productId = req.params.id;
    if (!req.session.cart) {
        req.session.cart = [];
    }
    req.session.cart.push(productId);
    res.redirect('/');
});

// Hiển thị giỏ hàng
router.get('/cart', async (req, res) => {
    const cart = req.session.cart || [];
    const products = await Product.find({ _id: { $in: cart } });
    res.render('cart', { products });
});

// Thêm sản phẩm mới
// router.post('/product/add', async (req, res) => { 
//     try {
//         // Tạo đối tượng sản phẩm mới từ dữ liệu gửi lên
//         const { name, price, description, imageUrl } = req.body;

//         const newProduct = new Product({
//             name,
//             price,
//             description,
//             imageUrl
//         });

//         // Lưu sản phẩm vào cơ sở dữ liệu
//         await newProduct.save();

//         // Trả về phản hồi thành công
//         res.status(201).json({ message: 'Product added successfully', product: newProduct });
//     } catch (error) {
//         // Trả về lỗi nếu có sự cố
//         res.status(500).json({ message: 'Error adding product', error: error.message });
//     }
// });
router.post('/api/products', async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const newProduct = new Product({ name, description, price, imageUrl });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ error: 'Failed to create product' });
  }
});


// Cập nhật thông tin sản phẩm
router.put('/product/update/:id', async (req, res) => {
    try {
        // Lấy ID sản phẩm từ URL
        const productId = req.params.id;

        // Dữ liệu mới để cập nhật sản phẩm từ body
        const { name, price, description, imageUrl } = req.body;

        // Tìm và cập nhật sản phẩm dựa trên ID
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                name,
                price,
                description,
                imageUrl
            },
            { new: true } // Trả về bản ghi đã được cập nhật
        );

        // Kiểm tra nếu không tìm thấy sản phẩm
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Trả về phản hồi thành công với sản phẩm đã được cập nhật
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        // Trả về lỗi nếu có sự cố
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
});

// Xóa sản phẩm
router.delete('/product/delete/:id', async (req, res) => {
    try {
        // Lấy ID sản phẩm từ URL
        const productId = req.params.id;

        // Tìm và xóa sản phẩm dựa trên ID
        const deletedProduct = await Product.findByIdAndDelete(productId);

        // Kiểm tra nếu không tìm thấy sản phẩm
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Trả về phản hồi thành công nếu xóa thành công
        res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (error) {
        // Trả về lỗi nếu có sự cố
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
});

module.exports = router;
