const express = require('express');
const app = express();
const deleteData = require('./database/database_initialize/database_clear');
const importData = require('./database/database_initialize/database_insert');
app.use(express.json());
const User = require('./database/models/user');

//<<<<<<< connection to database >>>>>>
const db = require('./database/database');

//<<<<<< routes >>>>>>//
const authenticateToken = require('./routes/authMiddleware');

app.get('/users', authenticateToken, async (req, res) => {
  const users = await User.find();
  res.json(users);
});


//<<<<<< each time the server restarts/runs data from the database gets deleted and imported respectively >>>>>>
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