const moment = require('moment');

const messGenerate = (message) => {
    return {
        message,
        createAt: moment(new Date()).format('LT'),
    }
}

const locationMessGenerate = (location) => {
    return {
        location,
        createAt: moment(new Date()).format('LT'),
    }
}

module.exports = {
    messGenerate,
    locationMessGenerate
}