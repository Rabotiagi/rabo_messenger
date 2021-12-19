const moment = require('moment');

const wrapper = (user, msg, sender) => {
    return {
        firstName: user,
        message: msg,
        sender,
        time: moment().format('h:mm a')
    };
};

module.exports = wrapper;