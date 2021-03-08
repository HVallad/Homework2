const Express = require('express');

const App = Express();

const BodyParser = require('body-parser');

const Mongoose = require('mongoose');

const ConnectionString = process.env.CCSTRING;

const UserRouter = require('./routes/userRoute.js');

const ProductRouter = require('./routes/productRoute.js');

App.use(BodyParser.json());

App.use('/Users', UserRouter);

App.use('/Products', ProductRouter);

App.use((request, response) => {
  response.status(404).json({ status: 404, message: 'Page not found' });
});

(async () => {
  try {
    await Mongoose.connect(ConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    App.listen(8080);
  } catch (e) {
    App.listen(8080);
  }
})();
