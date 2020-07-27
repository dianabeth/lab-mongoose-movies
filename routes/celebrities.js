const express = require('express');
const celebRouter = express.Router();
const Celebrity = require('../models/celebrity');

celebRouter.get('/', (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      res.render('celebrities/index', { celebrities });
    })
    .catch(error => {
      next(error);
    });
});

celebRouter.get('/celebrities/:id', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then(celebrities => {
      res.render('celebrities/show', celebrities);
    })
    .catch(error => {
      next(error);
    });
});

celebRouter.post('/create', (req, res, next) => {
  const data = req.body;
  Celebrity.create(data)
    .then(celebrity => {
      celebrity.save();
      res.render('celebrities/create', { celebrity });
    })
    .catch(error => {
      console.log('error:'.error);
      res.redirect('/create');
    })
    .then(() => {
      res.redirect('/celebrities');
    });
});

module.exports = celebRouter;
