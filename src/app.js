const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const initModels = require('./models/initModels');
const db = require('./utils/database');
const userRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');
const productsRoutes = require('./routes/products.routes');
const errorHandlerRouter = require('./routes/errorHandler.routes');

initModels();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const PORT = 8000;

db.authenticate()
  .then(() => {
    console.log('DB connection successful');
  })
  .catch(error => console.log(error));

db.sync()
  .then(() => console.log('DB synchronized'))
  .catch(error => console.log(error));

app.use(userRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(productsRoutes);
app.use(orderRoutes);

errorHandlerRouter(app);

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
