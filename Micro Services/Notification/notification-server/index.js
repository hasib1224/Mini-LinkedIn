const connect = require('./database/db')
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const app = express();
const notificationsRouter = require('./routes/notification-routes')

dotenv.config()
const port = process.env.PORT;
const uri = process.env.DB_URI

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/notification', notificationsRouter)

app.get('/notification', (req, res) => {
  res.send("Notification server")
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

connect()