// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const productRoutes = require('./routes/productRoutes');

// const app = express();
// app.use(bodyParser.json());


// // Kết nối MongoDB
// mongoose.connect('mongodb+srv://admin:123@cluster0.qek7w.mongodb.net/lab5', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Could not connect to MongoDB', err));

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));
// app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));

// // Cài đặt view engine
// app.set('view engine', 'ejs');

// // Routes
// app.use('/', productRoutes);

// // Chạy server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');

const app = express();

mongoose.connect('mongodb+srv://admin:123@cluster0.qek7w.mongodb.net/lab5', { // thay thế bằng connection string của các bạn
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('Database connection error:', err);
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));

app.use('/', productRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
