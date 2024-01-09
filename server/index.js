const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes')
const compression = require('compression')
const morgan = require('morgan')
require("dotenv").config()

const app = express();
const PORT = process.env.PORT||5000;
app.use(cors());
// app.options("/", (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "https://real-estate-mern-full-stack-ui.vercel.app");
//     res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//     res.sendStatus(204);
//   });

app.use(bodyParser.json());
// app.use(cors({origin: 'https://real-estate-mern-full-stack-ui.vercel.app' }));
// app.use((req, res, next) => {
// //   res.setHeader('Access-Control-Allow-Credentials', true)
// //   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Origin',origin);
//   res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//   )
//     next();
// });

// const originAllowed = 'https://real-estate-mern-full-stack-ui.vercel.app';
// app.use(cors({
//     origin: originAllowed,
//     methods: ['HEAD', 'OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
//     credentials: true,
//   }));

// app.use((req, res, next) => {
//     // res.header('Access-Control-Allow-Credentials', true)
//     res.header('Access-Control-Allow-Origin', 'https://real-estate-mern-full-stack-ui.vercel.app')
//     res.header('Access-Control-Allow-Methods','HEAD', 'OPTIONS', 'GET', 'POST', 'PUT', 'DELETE')
//     res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization')
//     res.header(
//         'Access-Control-Allow-Headers',
//         'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//       )
//     next()
// });
app.use([
    compression(),
    express.json(),
    express.urlencoded({extended: false})
])

app.use(morgan('dev'));
if(process.env.NODE_ENV === 'development'){

};

app.use('/api/v1', router)
// app.get('/', (req, res) => {
//     console.log('check test route')
//     res.send('check test route response')
// })
const mongooseUrl = process.env.Mongoose_Url;
mongoose.connect(mongooseUrl, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    retryWrites:true
})
.then(() => console.log('connected to mongoDB'))
.catch((error) => console.error('error connecting to mongoDB:', error));

app.use((req, res, next) => {
    res.status(404).json('bad request')
});
app.use((error, req, res, nesxt) => {
    if(error.status){
        res.status(error.status).json(error.message)
    } else {
        console.log(error)
        res.status(500).json('interval server error')
    }
});
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });
  
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
  });
  

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

