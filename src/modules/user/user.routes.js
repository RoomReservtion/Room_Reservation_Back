const HttpStatus = require('http-status-codes');
const express = require('express');
const router = express.Router();

const route = ({ db }) => {
  const userController = require('./user.controller')({ db });

  router.get('/user', async (req, res) => {
    try {
      const user = await userController.get(req, res);
      res.status(HttpStatus.OK).send(user);
    } catch (err) {
      console.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  });
  router.get('/user/getByName', async (req, res) => {
    try {
      const user = await userController.getByName(req, res);
      res.status(HttpStatus.OK).send(user);
    } catch (err) {
      console.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  });
  router.post('/user', async (req, res) => {
    try {
      await userController.create(req, res);
      res.status(HttpStatus.OK);
    } catch (err) {
      console.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  });
  router.put('/user', async (req, res) => {
    try {
      const user = await userController.change(req, res);
      res.status(HttpStatus.OK);
    } catch (err) {
      console.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  });

  return router;
};

module.exports = route;