const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const StudentModel = require('./models/student');
const app = express();
require('dotenv/config'); // DB connenction on mlab.com

const port = 4201;

app.use(bodyParser.json());

//ROUTES
app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.get('/db/students', (req, res) => {
    StudentModel.find()
        .then( data => {
            res.json(data);
        })
        .catch( error => res.json({message: error}));
});

app.post('/db/addStudent', (req, res) => {
    const student = new StudentModel({
        name: req.body.name,
        balance: req.body.balance,
        hourfee: req.body.hourfee
    });

    student.save()
        .then( data => {
            res.json(data);
        })
        .catch( error => res.json({message: error}));
});

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, 
    () =>{
        console.log('Connected to DB.');
    });

//Start and listening server
app.listen(port, (error) => {
    if (error) {
        console.log(`Error:`, error);
    } else {
        console.log('Server is listening on port', port);
    }
});