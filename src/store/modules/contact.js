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
        addContact(state, data) {
            state.contacts.push(data);
        },
        updateSearch(state, data) {
            state.searchRes = data;
        },
        updateLastMessage(state, id, message) {
            const contact = state.contacts.find((item) => item.id = id);
            if (contact) {
                contact.msg = message;
            }
        }
    }
}