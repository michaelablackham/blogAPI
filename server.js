//Required modules and middleware etc
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//calling/activting above constants - call node/express
const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));


app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
