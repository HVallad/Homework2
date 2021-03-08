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

App.use((request, response, next) => {
  response.status(404).json({status: 404, message:'Page not found'});
});

(async () => {
  await Mongoose.connect('mongodb+srv://Admin:AdminPassword@cluster0.pufhs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  App.listen(8080);
})();
