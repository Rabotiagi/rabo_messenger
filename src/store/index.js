import Vuex from 'vuex'
import Vue from 'vue'
import io from 'socket.io-client';
import group from './modules/group';
import contact from './modules/contact';
import message from './modules/message';
import file from './modules/file';
import getCookie from '@/plugins/getCookie.js';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        socket: io(),
        currentUser: null,
        currentChat: null,
        newMessage: null
    },
    getters: {
        socket(state) {
            return state.socket;
        },
        user(state) {
            if (state.currentUser) {
                return state.currentUser;
            }
        },
        chat(state) {
            if (state.currentChat) {
                return state.currentChat;
            }
        },
        message(state) {
            if (state.newMessage) {
                return state.newMessage;
            }
        }
    },
    mutations: {
        setUser(state) {
            state.currentUser = getCookie('user-id');
        },
        setChat(state, id) {
            state.currentChat = id;
        },
        setMessage(state, message) {
            state.newMessage = message;
        },
        setActive(state, id) { // definitely needs a rewrite
            state.contact.contacts.forEach(item => {
                item.active = false;
            });
            state.contact.searchRes.forEach(item => {
                item.active = false;
            });
            state.group.groups.forEach(item => {
                item.active = false;
            });
            const res1 = state.contact.contacts.find(item => item.chat == id);
            if (res1) {
                res1.active = true;
                return;
            }
            const res2 = state.contact.searchRes.find(item => item.id == id);
            if (res2) {
                res2.active = true;
                return;
            }
            const res3 = state.group.groups.find(item => item.chat == id);
            if (res3) {
                res3.active = true;
            }
        },
        connectFilesToMessages(state) {
            state.file.files.forEach(item => {
                const res = state.message.messages.find(elem => elem.id == item.fromMsg);
                if (res) {
                    res.message = item.name;
                    res.file = item.fileName;
                }
            });
        },
        connectPhotosToMessages(state) {
            state.message.messages.forEach(item => {
                if (item.photo !== null) {
                    return;
                }
                const res = state.contact.contacts.find(elem => elem.id == item.sender);
                if (res) {
                    item.photo = res.photo;
                }
            })
        }
    },
    modules: {
        group,
        contact,
        message,
        file
    }
});