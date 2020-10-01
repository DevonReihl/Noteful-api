require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
// const validateBearerToken = require('./validate-bearer-token')
const errorHandler = require('./error-handler')
const notesRouter = require('./notes/notes-router')
const foldersRouter = require('./folders/folders-router')

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'dev';

const app = express();
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
// app.use(validateBearerToken)

app.use('/notes', notesRouter)
app.use('/folders', foldersRouter)

app.get('/', (req, res) => {
  res.send('Hello, beautiful!');
});

app.use(errorHandler);
module.exports = app;