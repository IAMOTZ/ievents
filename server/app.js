import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import db from './models/index';
import apiRoutes from './apiRoutes';

const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname + '/public')));

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use('/api/v1', apiRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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
