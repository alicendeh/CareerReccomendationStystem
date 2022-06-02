const express = require('express');
const database = require('./config/db');
const cors = require('cors');

// tryQuery();

database();

const app = express();

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:tru/
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/users', require('./routes/authentication'));
app.use('/career', require('./routes/career'));
app.use('/comment', require('./routes/comment'));
app.use('/queryData', require('./routes/query'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Succesfully Started on Port ${PORT}`);
});
