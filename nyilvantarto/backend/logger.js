const { createLogger, transports, format } = require('winston');

function getDateSTR() {
    let date = new Date();
    let month = date.getMonth()+1 < 10?
        `0${date.getMonth()+1}`:
        date.getMonth()+1;
    let day = date.getDate() < 10?
        `0${date.getDate()}`:
        date.getDate();
    return `${date.getFullYear()}_${month}_${day}`;
}

const logger = createLogger({
    transports: [
        new transports.File({
            filename: `logs/${getDateSTR()}.log`,
            level: 'info',
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        })
    ],
    exceptionHandlers: [
        new transports.File({
            filename: `logs/Exceptions_${getDateSTR()}.log`,
            level: 'info',
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        })
    ]
})

module.exports = logger;