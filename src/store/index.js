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
        }
    },
    modules: {
        group,
        contact,
        message,
        file
    }
});