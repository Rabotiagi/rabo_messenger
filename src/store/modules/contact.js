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
            data.forEach(item => {
                item.createdAt = transformDate(item.createdAt);
            });
            state.contacts = data;
        },
        addContact(state, data) {
            state.contacts.push(data);
        },
        updateSearch(state, data) {
            state.searchRes = data;
        }
    } 
}