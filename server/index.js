const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv/config');
const session = require('express-session');

const app = express();

app.use(
  session({
    secret: 'some secret',
    cookie: { maxAge: 3600000 * 24 * 7 }, // неделя (вродебы)
    resave: true,
    saveUninitialized: false,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use('/', require('./routes/authRoutes'));

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log(`DB connected!`))
  .catch((e) => console.error(e));

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
