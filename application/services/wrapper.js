const moment = require('moment');

const wrapper = (user, msg) => {
    return {
        username: user,
        message: msg,
        time: moment().format('h:mm a')
    };
};

module.exports = wrapper;