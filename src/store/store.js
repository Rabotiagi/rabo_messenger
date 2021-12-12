import Vuex from 'vuex'
import Vue from 'vue'
import io from 'socket.io-client';

Vue.use(Vuex)

const socket = io();

export default new Vuex.Store({
    state: {
        socket: socket
    },
    
    getters: {
        
    },
    
    mutations: {
        
    },
    
    actions: {
        
    }
});