import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import db from './models/index';
import apiRoutes from './apiRoutes';

const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

const publicPath = express.static(path.join(__dirname, '../public'));
app.use('/public', publicPath);

if (process.env.NODE_ENV !== 'production') {
  import webpack from 'webpack';
  import webpackDevMiddleware from 'webpack-dev-middleware';
  import webpackHotMiddleware from 'webpack-hot-middleware';
  const config = require('../webpack.dev.config.js')
  const compiler = webpack(config)

  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Token');
  next();
});

app.use('/api/v1', apiRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'page not found' });
});

app.set('port', process.env.PORT || 3000);

db.sequelize.sync()
  .then(() => {
    app.listen(app.get('port'), () => {
      console.log(`App started on port ${app.get('port')}`);
    });
  });

export default app;
