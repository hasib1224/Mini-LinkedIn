const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const app = express();
const postsRouter = require('./routes/postRoutes.js')
const connectDB = require('./database/db.js');
// const { connect } = require('mongoose');


dotenv.config()

const port = process.env.PORT;
const uri = process.env.DB_URI

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/posts',postsRouter)

app.get('/posts', (req,res)=>{
    res.send("Linkedin Posts server")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

connectDB()