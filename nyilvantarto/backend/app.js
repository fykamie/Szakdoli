const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const StudentModel = require('./models/student');

const app = express();
const port = 4201;
require('dotenv/config'); // DB connenction on mlab.com in file

//Middlewares
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

app.get('/db/students/:studentId', (req, res) => {
    StudentModel.findById(req.params.studentId)
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

app.delete('/db/students/:studentId', (req, res) => {
    StudentModel.remove({_id: req.params.studentId})
        .then( data => {
            if (data.deletedCount<=0) {
                res.statusCode = 409;
                res.json({message: "Nem létező diákot akart törölni."});
            }
            res.json("Ok");
        })
        .catch( error => res.json({message: error}));
});

app.patch('/db/students/:studentId', async (req, res) => {
    try {
        const toBeUpdated = await StudentModel.findById(req.params.studentId);
       if (req.body.name) {
           toBeUpdated.name = req.body.name;
       }
       if (req.body.hourfee) {
           toBeUpdated.hourfee = req.body.hourfee;
       }
       const updated = await StudentModel.updateOne(
           { _id: req.params.studentId },
           { $set: {name: toBeUpdated.name, hourfee: toBeUpdated.hourfee} }
        );
        res.json(updated);
    } catch (error) {
        res.json({message: error});
    }
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