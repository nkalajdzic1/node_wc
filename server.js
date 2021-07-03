const express = require('express');
const fs = require('fs');
const app = express();

const User = require('./database/models/user');

app.use(express.json());

//<<<<<< routes >>>>>>//
const registrationRouter = require('./routes/registration');
const loginRouter = require('./routes/login');

app.use("/registration", registrationRouter);
app.use("/login", loginRouter);

//<<<<<<< connection to database >>>>>>//
const db = require('./database/database');

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