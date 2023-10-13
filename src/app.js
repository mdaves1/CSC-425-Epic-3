import createError from 'http-errors';
import express, { json, urlencoded, static as static_ } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import readApiRouter from './routes/api/read.js';
//import createApiRouter from './routes/api/create.js';
import createDeleteRouter from './routes/api/delete.js';

const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', readApiRouter)
//app.use('/api', createApiRouter)
app.use('/api', createDeleteRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;