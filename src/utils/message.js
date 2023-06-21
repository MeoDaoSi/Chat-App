const moment = require('moment');

const messGenerate = (username,message) => {
    return {
        username,
        message,
        createAt: moment(new Date()).format('LT'),
    }
}

const locationMessGenerate = (username,location) => {
    return {
        username,
        location,
        createAt: moment(new Date()).format('LT'),
    }
}

module.exports = {
    messGenerate,
    locationMessGenerate
}