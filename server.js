const Express = require('express');

const App = Express();
// const BodyParser = require('body-parser');
const Mongoose = require('mongoose');

const ConnectionString = process.env.CCSTRING;

const UserRouter = require('./routes/userRoute.js');

// May be used for parsing in service
// app.use(BodyParser.json());

App.use('/Users', UserRouter);

(async () => {
  await Mongoose.connect(ConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  App.listen(25565);
})();
