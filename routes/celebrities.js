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

celebRouter.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/create');
});

celebRouter.post('/celebrities/create', (req, res, next) => {
  const data = req.body;
  Celebrity.create({
    name: data.name,
    occupation: data.occupation,
    catchPhrase: data.catchPhrase
  })
    .then(celebrity => {
      res.redirect('/celebrities');
    })
    .catch(error => {
      console.log('error:'.error);
      next(error);
    });
});

celebRouter.get('/celebrities/:id', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then(celebrities => {
      res.render('celebrities/show', { celebrities });
    })
    .catch(error => {
      next(error);
    });
});

celebRouter.get('/celebrities/:id/edit', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then(celebrities => {
      res.render('celebrities/edit', { celebrities });
    })
    .catch(error => {
      next(error);
    });
});

celebRouter.post('/celebrities/:id/edit', (req, res, next) => {
  const id = req.params.id;
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase })
    .then(celebrity => {
      console.log('celeb updated sucessfully', celebrity);
      res.redirect('/celebrities');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = celebRouter;
