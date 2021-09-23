import express, { Application, json } from 'express';
import morgan from 'morgan';

// import  bodyparse  from 'body-parser';

//Importin routes
import bookRoute from './routes/book';
import providerRoute from './routes/provider';

// initialization
const app: Application = express();


// middlewares
app.use(morgan('dev'));
app.use( json() );
app.use(express.urlencoded({extended: true})) 



//  app.use(bodyparse.urlencoded({extended:false}));
//  app.use(bodyparse.json());


//routes

app.use('/api/book', bookRoute); 
app.use('/api/provider', providerRoute);

export default app;