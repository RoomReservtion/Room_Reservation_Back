const HttpStatus = require('http-status-codes');
const express = require('express');
const router = express.Router();

const route = ({ db }) => {
  const reservationsController = require('./reservations.controller')({ db });

  router.post('/reservations', async (req, res) => {
    try {
      await reservationsController.create(req, res);
      res.status(HttpStatus.OK);
    } catch (err) {
      console.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  });

  router.put('/reservations', async (req, res) => {
    try {
      await reservationsController.change(req, res);
      res.status(HttpStatus.OK);
    } catch (err) {
      console.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  });

  router.get('/reservations', async (req, res) => {
    try {
      const invoices = await reservationsController.get(req, res);
      res.status(HttpStatus.OK).send(invoices);
    } catch (err) {
      console.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  });

  router.get('/reservations/getByUser', async (req, res) => {
    try {
      const invoices = await reservationsController.getByUser(req, res);
      res.status(HttpStatus.OK).send(invoices);
    } catch (err) {
      console.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  });

  router.delete('/reservations', async (req, res) => {
    try {
      await reservationsController.delete(req, res);
      res.status(HttpStatus.OK);
    } catch (err) {
      console.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  });
  return router;
};

module.exports = route;
