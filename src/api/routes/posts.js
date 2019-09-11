const express = require('express');
const PostModel = require('../../models/post');

const route = express.Router();

// CRUD for posts (minus the update)
const posts = async app => {
  app.use('/posts', route);

  // Create a post
  route.post('/', (req, res) => {
    const post = new PostModel({
      text: req.body.text
    });
    post.save((err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(201).send();
      }
    });
  });

  // Read all posts
  route.get('/', (req, res) => {
    PostModel.find({}, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  });

  // Delete a post
  route.delete('/:id', (req, res) => {
    PostModel.deleteOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send();
      }
    });
  });
};

module.exports = posts;
