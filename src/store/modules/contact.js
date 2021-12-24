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
                    newArr.push(item);
                }
            });
            state.contacts = newArr;
        },
        updateOneContact(state, data) {
            console.log(data);

            const contact = state.contacts.find((item) => item.chat == data.chat);
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
        updateSearch(state, data) {
            state.searchRes = data;
        }
    }
}