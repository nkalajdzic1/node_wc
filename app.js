const express = require('express');
const app = express();

app.use("/registration", require("./routes/registration"));



app.get('/', (req, res) => {
  res.send('Main route');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => console.log(`Server listening on port ${PORT}`));