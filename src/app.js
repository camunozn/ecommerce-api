const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./utils/database');
const userRoutes = require('./routes/user.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');
const productRoutes = require('./routes/product.routes');
const errorHandlerRouter = require('./routes/errorHandler.routes');
const initModels = require('./models/initModels');

initModels();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT;

db.authenticate()
  .then(() => {
    console.log('DB connection successful');
  })
  .catch(error => console.log(error));

db.sync()
  .then(() => console.log('DB synchronized'))
  .catch(error => console.log(error));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/cart', cartRoutes);

errorHandlerRouter(app);

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
