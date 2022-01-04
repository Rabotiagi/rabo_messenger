import transformDate from '@/plugins/transformDate.js';

export default {
    state: {
        contacts: [],
        searchRes: []
    },
    getters: {
        allContacts(state) {
            return state.contacts;
        },
        searchResults(state) {
            return state.searchRes;
        }
    },
    mutations: {
        updateContacts(state, data) {
            const newArr = [];
            data.forEach(item => {
                if (!Array.isArray(item.id)) {
                    item.createdAt = transformDate(item.createdAt);
                    item.active = false;
                    item.notify = false;
                    newArr.push(item);
                }
            });
            state.contacts = newArr;
        },
        updateOneContact(state, data) {
            const contact = state.contacts.find(item => item.chat == data.chat);
            if (contact) {
                contact.msg = data.msg;
                return;
            }
            if (!Array.isArray(data.id)) {
                state.contacts.push(data);
            }
        },
        addContact(state, data) {
            state.contacts.push(data);
        },
        deleteContact(state, id) {
            const res = state.contacts.find(item => item.chat == id);
            if (res) {
                state.contacts.splice(state.contacts.indexOf(res), 1);
            }
        },
        updateSearch(state, data) {
            data.forEach(item => {
                item.active = false;
            })
            state.searchRes = data;
        },
        setNotify(state, data) {
            const res = state.contacts.find(item => item.chat == data.chat);
            if (res) {
                res.notify = true;
            }
        },
        removeNotify(state, data) {
            const res = state.contacts.find(item => item.chat == data.chat);
            if (res) {
                res.notify = false;
            }
        }
    }
}