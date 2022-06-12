/* Modules Required */
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config/db-config.js';
const app = express();

mongoose.connect(config.dbpath, { dbName: 'e_com' })
  .then(() => {
    console.log('Connected to database ')
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  })
mongoose.Promise = global.Promise;
app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));
app.use(express.json({ limit: '5mb' })); //For JSON requests
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
var originsWhitelist = [
  'http://localhost:4200' | 'http://192.168.43.25:4200',      //this is my front-end url for development
  //  'http://www.myproductionurl.com'
];
var corsOptions = {
  origin: function (origin, callback) {
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: true
}

/* CORS Handling */
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-headers', 'origin, X-Requested-With,Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.statusCode(200).json({});
  }
  next();
})

/* Routes Required */
import productRoutes from './modules/product/routes.js';


app.use('/api/v1/products', productRoutes)

app.get('/users', async (req, res) => {
  res.send('route called')
})

// Error Handling 
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
})

app.listen(3000, function () {
  console.log("Server is running on port " + 3000);
});
