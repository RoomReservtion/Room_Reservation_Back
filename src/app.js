const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const db = require('./models');

// const authRouter = require('./modules/auth/auth.routes')({db});
const userRouter = require('./modules/user/user.routes')({db});
const reservationsRouter = require('./modules/reservations/reservations.routes')({db});
const placesRouter = require('./modules/places/places.routes')({db});
const roomsRouter = require('./modules/rooms/rooms.routes')({db});

app.use(cors());
app.use(bodyParser());

app.use('/', userRouter, placesRouter, roomsRouter, reservationsRouter);

app.get('/', (req, res) => {
  res.status(200).send();
});

app.use('/', (req, res) => {
  res.status(404).send();
});

module.exports = app;
