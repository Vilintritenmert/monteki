let mongoose = require('mongoose');

function init(app) {
    require('./general')(app);

    mongoose.connect();
}

module.exports = init;