const express = require('express');
const mongoose = require('mongoose');

const items = require('./routes/api/items');

const path = require('path');



/** Lets us get requests and data from the body */
const bodyParser = require('body-parser');

const app = express();

/** Bodyparser middleware */ //app.user(express.json())
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Conect to Mongo
mongoose
.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));


// Use routes
app.use('/api/items', items);

// Serve static assets (build folder) if in production
if (process.env.NODE_ENV === "production"){
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));