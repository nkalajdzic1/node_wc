const express = require('express');
const app = express();

const deleteData = require('./database/database_initialize/database_clear');
const importData = require('./database/database_initialize/database_insert');

app.use(express.json());

//<<<<<<< connection to database >>>>>>
const db = require('./database/database');

//<<<<<< routes >>>>>>//
const listRouter = require('./routes/list');
const reportRouter = require('./routes/report');

app.use("/list", listRouter);
app.use("/report", reportRouter);

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