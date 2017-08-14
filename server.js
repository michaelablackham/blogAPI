//Required modules and middleware etc
const express = require('express');
const morgan = require('morgan');
//ROUTING
const blogPostsRouter = require('./blogPosts');
//calling/activting above constants - call node/express
const app = express();

// log the http layer
app.use(morgan('common'));

app.use('/blog-posts', blogPostsRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
