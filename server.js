require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();

app.use(express.json());

//<<<<<<< connection to database >>>>>>
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
}).then(() => console.log('Database connected.')).catch(() => console.log('Database failed to connect.'))

const User = require('./database/models/user');

//<<<<<< routes >>>>>>//
const registrationRouter = require('./routes/registration');
const loginRouter = require('./routes/login');

app.use("/registration", registrationRouter);
app.use("/login", loginRouter);

//<<<<<< database seeders >>>>>>//
const user_seeds = JSON.parse(fs.readFileSync(`${__dirname}/database/seeders/user.json`, "utf-8"));

//<<<<<< clearing up database before importing data >>>>>>
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log("Database data cleared.");
  } catch (exception) {
    console.log(exception);
  }
}

//<<<<<< database import of seeds >>>>>>//
const importData = async () => {
  try {
    await User.create(user_seeds);
    console.log("Data for users imported.");
    //process.exit();
  } catch (exception) {
    console.log(exception);
  }
}

//<<<<<< each time data from database gets deleted and imported respectively >>>>>>
deleteData()
  .then(() =>
    importData()
    .catch(err => console.log(err)))
  .catch(err => console.log(err));

/* 
  NOTE: with if(process.argv[2] === '-i') deleteData().then... 
  we could specify when running the server if we want to execute insert, delete or both for the db
*/

//<<<<<< server >>>>>>//
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => console.log(`Server listening on port ${PORT}`));