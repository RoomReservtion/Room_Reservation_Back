const HttpStatus = require('http-status-codes');
const express = require('express');
const router = express.Router();

const route = ({ db }) => {
  const placesController = require('./places.controller')({ db });

  router.post('/places', async (req, res) => {
    try {
      await placesController.create(req, res);
      res.status(HttpStatus.OK).send({ message });
    } catch (err) {
      console.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  });

  router.get('/places', async (req, res) => {
    try {
      const rooms = await placesController.get(req, res);
      res.status(HttpStatus.OK).send(rooms);
    } catch (err) {
      console.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  });

  router.delete('/places', async (req, res) => {
    try {
      await placesController.delete(req, res);
      res.status(HttpStatus.OK);
    } catch (err) {
      console.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  });

  return router;
};

module.exports = route;
