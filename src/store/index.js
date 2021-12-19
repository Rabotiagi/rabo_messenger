import Vuex from 'vuex'
import Vue from 'vue'
import io from 'socket.io-client';
import contact from './modules/contact';
import message from './modules/message'

Vue.use(Vuex)

const socket = io();

export default new Vuex.Store({
    state: {
        socket: socket,
        currentUser: false,
        currentChat: false
    },
    getters: {
        getUser(state) {
            if (state.currentUser) {
                return state.currentUser;
            }
        },
        getChat(state) {
            if (state.currentChat) {
                return state.currentChat;
            }
        }
    },
    mutations: {
        setUser(state, id) {
            state.currentUser = id;
        },
        setChat(state, id) {
            state.currentChat = id;
        }
    },
    modules: {
        contact,
        message
    }
});