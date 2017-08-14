//Required modules and middleware etc
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {BlogPosts} = require('./models');

//calling/activting above constants - call node/express
const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

//Create example blog posts
BlogPosts.create(
  'Skim Milk',
  'There is one thing I hate more than lying, and that is skim milk. Which is water. That is lying about being milk.',
  'Ron Swanson'
);
BlogPosts.create(
  'Christmas',
  'St Patricks Day is the closet thing the Irish have to Christmas.',
  'Michael Scott'
);
BlogPosts.create(
  'Get a job',
  'Oh, get a job? Just get a job? Why dont I strap on my job helmet and squeeze down into a job cannon and fire off into job land, where jobs grow on jobbies?!',
  'Charlie day'
);

app.get('/blog-posts', (req, res) => {
  res.json(BlogPosts.get());
});


app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
