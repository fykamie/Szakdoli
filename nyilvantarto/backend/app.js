const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const StudentModel = require('./models/student');
const cors = require('cors');

const app = express();
const port = 4201;
require('dotenv/config'); // DB connenction on mlab.com in file

//Middlewares
app.use(cors());
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
            if (!data) {
                res.statusCode = 409;
                res.json({message: "Nem létezik ilyen diák!"})
            }
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
        .catch( error => res.json({message: error.message}));
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
        .catch( error => res.json({message: error.message}));
});

app.patch('/db/students/:studentId', async (req, res) => {
    try {
        const toBeUpdated = await StudentModel.findById(req.params.studentId);
        if (!toBeUpdated) {
            res.json({message: "Nem létező diák adatait szeretné módosítani!"})
            return;
        }
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
        if (updated.nModified <= 0) {
            res.statusCode = 4001
            res.json({message: "Nem történt változtatás."});
        }
        res.json(updated);
    } catch (error) {
        res.json({message: error.message});
    }
});

app.get('/db/students/addAppearance/:studentId', async (req, res) => {
    try {
        const toBeUpdated = await StudentModel.findById(req.params.studentId);
        if (!toBeUpdated) {
            res.statusCode = 409;
            res.json({message: "Nem létezik ilyen diák!"})
            return;
        }
        toBeUpdated.balance = toBeUpdated.balance - toBeUpdated.hourfee;
        const updated = await StudentModel.updateOne(
           { _id: req.params.studentId },
           { $set: {balance: toBeUpdated.balance} }
        );
        if (updated.nModified <= 0) {
            res.statusCode = 4001
            res.json({message: "Nem történt változtatás."});
        }
        res.json(updated);
    } catch (error) {
        res.json({message: error});
    }
});

app.post('/db/students/addPayment/:studentId', async (req, res) => {
    try {
        const toBeUpdated = await StudentModel.findById(req.params.studentId);
        const payment = req.body.payment;
        if (!toBeUpdated) {
            res.statusCode = 409;
            res.json({message: "Nem létezik ilyen diák!"})
            return;
        }
        if (!payment || !Number(payment)) {
            res.statusCode = 409;
            res.json({message: "Nem megfelelő formátumú fizetség!"});
            return;
        }
        toBeUpdated.balance = toBeUpdated.balance + payment;
        const updated = await StudentModel.updateOne(
           { _id: req.params.studentId },
           { $set: {balance: toBeUpdated.balance} }
        );
        if (updated.nModified <= 0) {
            res.statusCode = 4001
            res.json({message: "Nem történt változtatás."});
        }
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