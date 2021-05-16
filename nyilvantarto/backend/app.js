const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const StudentModel = require('./models/student');
const logger = require('./logger');

const app = express();
const port = 4201;
require('dotenv/config'); // DB connenction on mlab.com in file
/** DB_CONNECTION=mongodb+srv://Me:test@szakdolicluster.jsptw.mongodb.net/students?retryWrites=true&w=majority */

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//ROUTES
app.get('/', (req, res) => {
    res.send('Backend is running');
    logger.info('Hi there stranger!');
});

app.get('/db/students', (req, res) => {
    logger.info('Get all students');
    StudentModel.find()
        .then( data => {
            logger.info(`Students were, found: ${data}`);
            res.json(data);
        })
        .catch( error => {
            logger.error(`Get students broke with: ${error}`);
            res.json({message: error});
        });
});

app.get('/db/students/:studentId', (req, res) => {
    logger.info(`Get one specific student with id: ${req.params.studentId}`);
    StudentModel.findById(req.params.studentId)
        .then( data => {
            if (!data) {
                logger.error(`No student exists for getting with id: ${req.params.studentId}`);
                res.statusCode = 409;
                res.json({message: "Nem létezik ilyen diák!"})
            }
            logger.info(`Student(${data._id}) was found`);
            res.json(data);
        })
        .catch( error => {
            logger.error(`Get specific student with id: ${req.params.studentId} broke with: ${error}`);
            res.json({message: error})
        });
});

app.post('/db/addStudent', (req, res) => {
    logger.info(`Adding student: {name: ${req.body.name}, balance: ${req.body.balance}, hourfee: ${req.body.hourfee}}`);
    const student = new StudentModel({
        name: req.body.name,
        balance: req.body.balance,
        hourfee: req.body.hourfee
    });

    student.save()
        .then( data => {
            logger.info(`Adding student successfully. His/her id is: ${data._id}`);
            res.json(data);
        })
        .catch( error => {
            logger.error(`Adding student broke with: ${error}`);
            res.json({message: error.message});
        });
});

app.delete('/db/students/:studentId', (req, res) => {
    logger.info(`Deleting student with id: ${req.params.studentId}`);
    StudentModel.remove({_id: req.params.studentId})
        .then( data => {
            if (data.deletedCount<=0) {
                logger.error(`No student exists for deleting with id: ${req.params.studentId}`);
                res.statusCode = 409;
                res.json({message: "Nem létező diákot akart törölni."});
            }
            logger.info(`Succesfully deleted student with id: ${req.params.studentId}`);
            res.json("Ok");
        })
        .catch( error => {
            logger.info(`Deleting student broke with ${error}`);
            res.json({message: error.message});
        });
});

app.patch('/db/students/:studentId', async (req, res) => {
    logger.info(`Modifying student: id: ${req.params.studentId} new datas: {name: ${req.body.name}, hourfee: ${req.body.hourfee}}`);
    try {
        const toBeUpdated = await StudentModel.findById(req.params.studentId);
        if (!toBeUpdated) {
            logger.error(`No student exists for modifying with id: ${req.params.studentId}`);
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
            res.statusCode = 400;
            logger.info(`No modification happened with ${req.params.studentId}`);
            res.json({message: "Nem történt változtatás."});
            return;
        }
        logger.info(`Successfully modfied student with id: ${req.params.studentId}`);
        res.json(updated);
    } catch (error) {
        logger.error(`Modifying student with id: ${req.params.studentId} broke with ${error}`);
        res.json({message: error.message});
    }
});

app.post('/db/students/addAppearance/:studentId', async (req, res) => {
    logger.info(`Add -${req.body.owe} debt to student: ${req.params.studentId} `);
    try {
        const owe = req.body.owe;
        if (!owe || !Number(owe)) {
            logger.error(`Bad formatted or not exsiting debt: -${req.body.owe}`);
            res.statusCode = 409;
            res.json({message: "Nem megfelelő formátumú fizetség!"});
            return;
        }
        const toBeUpdated = await StudentModel.findById(req.params.studentId);
        if (!toBeUpdated) {
            logger.error(`No student exists for adding -${req.body.owe} debt with id: ${req.params.studentId}`);
            res.statusCode = 409;
            res.json({message: "Nem létezik ilyen diák!"})
            return;
        }
        toBeUpdated.balance = toBeUpdated.balance - owe;
        const updated = await StudentModel.updateOne(
           { _id: req.params.studentId },
           { $set: {balance: toBeUpdated.balance} }
        );
        if (updated.nModified <= 0) {
            logger.info(`Not modifed balance with debt: -${req.params.owe} to student: ${req.params.studentId}`);
            res.statusCode = 400
            res.json({message: "Nem történt változtatás."});
        }
        logger.info(`Successfully added -${req.body.owe} debt to student: ${req.params.studentId}`);
        res.json(toBeUpdated.balance);
    } catch (error) {
        logger.error(`Adding -${req.body.owe} debt to student ${req.params.studentId} broke with: ${error}`);
        res.json({message: error});
    }
});

app.post('/db/students/addPayment/:studentId', async (req, res) => {
    logger.info(`Add +${req.body.payment} payment to student: ${req.params.studentId} `);
    try {
        const toBeUpdated = await StudentModel.findById(req.params.studentId);
        const payment = req.body.payment;
        if (!toBeUpdated) {
            logger.error(`No student exists for adding +${req.body.payment} payment with id: ${req.params.studentId}`);
            res.statusCode = 409;
            res.json({message: "Nem létezik ilyen diák!"})
            return;
        }
        if (!payment || !Number(payment)) {
            logger.error(`Bad formatted or not exsiting payment: +${req.body.payment}`);
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
            logger.info(`Not modifed balance with payment: +${req.params.payment} to student:${req.params.studentId}`);
            res.statusCode = 400
            res.json({message: "Nem történt változtatás."});
        }
        logger.info(`Successfully added +${req.body.payment} payment to student: ${req.params.studentId}`);
        res.json(toBeUpdated.balance);
    } catch (error) {
        logger.error(`Adding +${req.body.payment} payment to student ${req.params.studentId} broke with: ${error}`);
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
        logger.info('Connected to DB.');
    }
);

//Start and listening server
app.listen(port, (error) => {
    if (error) {
        logger.crit(`******LISTENING ON PORT: ${port} BROKE WITH: ${error}******`);
    } else {
        logger.info(`Server is listening on port ${port}`);
    }
});