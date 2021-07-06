require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

//<<<<<<< connection to database >>>>>>
const db = require('./database/database');

//<<<<<< routes >>>>>>//
const registrationRouter = require('./routes/registration');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');


app.use("/registration", registrationRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);


//<<<<<< server >>>>>>//
const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => console.log(`Server listening on port ${PORT}`));