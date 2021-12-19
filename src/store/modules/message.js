import transformDate from '@/plugins/transformDate.js';

export default {
    state: {
        messages: []
    },
    getters: {
        allMessages(state) {
            return state.messages;
        }
    },
    mutations: {
        updateMessages(state, data) {
            data.forEach((item, i) => {
                if (data[i+1]) {
                    const date1 = new Date(item.time);
                    const date2 = new Date(data[i+1].time)
                    if(date1.getDay() !== date2.getDay()) {
                        item.date = item.time;
                    }
                }
                item.time = transformDate(item.time);
            })
            state.messages = data;
        },
        addMessage(state, data) {
            state.messages.push(data);
        }
    }  
}