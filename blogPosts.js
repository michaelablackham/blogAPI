//Required modules and middleware etc
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

const app = express();

//ROUTING
const blogPostsRouter = require('./blogPosts');

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

app.use('/', blogPostsRouter);

//simple get request to see json objects of blog posts
app.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

//post request to add new items to feed of blog posts
app.post('/', jsonParser, (req, res) => {
  //require certain fields (found in modules.js)
  const requiredFields = ['title','content','author'];
  //loop through each required field
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    //if current require field item is not within the request body
    if(!(field in req.body)) {
      // console/return an error
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  //If all goog, create a new blog post from the request title, content and author
  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
  //show the rsponse within postman of the new json item if successful
  res.status(201).json(item);
});

//DELETE request
app.delete('//:id', (req, res) => {
  //Get the parameter (id) and find blog post with that ID and delete
  BlogPosts.delete(req.params.id);
  res.status(204).end();
});

//Put request
app.put('//:id', jsonParser, (req, res) => {
  //require certain fields (found in modules.js)
  const requiredFields = ['title','content','author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    //if current require field item is not within the request body
    if(!(field in req.body)) {
      // console/return an error
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  if (req.params.id !== req.body.id) {
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }

  BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  });
  console.log(`Updating blog post \`${req.params.id}\``);
  res.status(204).end();
});

module.exports = router;
