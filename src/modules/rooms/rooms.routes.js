const HttpStatus = require('http-status-codes');
const express = require('express');
const router = express.Router();

const route = ({ db }) => {
  const roomsController = require('./rooms.controller')({ db });

  router.post('/rooms', async (req, res) => {
    try {
      await roomsController.create(req, res);
      res.status(HttpStatus.OK).send({ message });
    } catch (err) {
      console.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  });

  router.get('/rooms', async (req, res) => {
    try {
      const rooms = await roomsController.get(req, res);
      res.status(HttpStatus.OK).send(rooms);
    } catch (err) {
      console.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  });

  router.delete('/rooms', async (req, res) => {
    try {
      await roomsController.delete(req, res);
      res.status(HttpStatus.OK);
    } catch (err) {
      console.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  });

  return router;
};

module.exports = route;
