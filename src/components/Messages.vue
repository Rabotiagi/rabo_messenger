<template>
    <div class="chat">
        <div class="messages">
            <Message 
                v-for="(message, index) in allMessages"
                :key="index"
                v-bind:message="message"
            />
        </div>
        <form class="message-form" autocomplete="off" v-on:submit="send">
            <input id="message" type="text" placeholder="Write a message...">
            <button type="submit" class="submit-send"></button>
        </form>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Message from '../components/Message';
import $ from '@/plugins/selector.js';
import getCookie from '@/plugins/getCookie.js';

export default {
    computed: mapGetters(['getChat', 'allContacts', 'allMessages']),
    data() {
        return {
            newMsg: ''
        }
    },
    components: {
        Message
    },
    methods: {
        ...mapMutations(['setChat', 'updateMessages', 'addMessage']),
        send: function (event) {
            event.preventDefault();

            this.newMsg = event.target.elements.message.value;

            if (this.allMessages.length == 0) {
                this.$store.state.socket.emit('createChat', [getCookie('user-id'), this.getChat]);
            } else {
                this.$store.state.socket.emit('chatMessage', this.newMsg, getCookie('user-id'), this.getChat);
            }

            event.target.elements.message.value = "";
            event.target.elements.message.focus();
        }
    },
    created() {
        this.$store.state.socket.on('history', async (data) => {
            this.updateMessages(data);
        });

        this.$store.state.socket.on('message', async (data) => {
            this.addMessage(data);
        });

        this.$store.state.socket.on('newChat', async (id, users) => {
            this.setChat(id);
            
            if (users.length > 2) {
                //await this.$store.state.socket.emit('chatMessage', this.newMsg, getCookie('user-id'), this.getChat);
                this.newMsg = "welcome to new chat";
            }
            
            await this.$store.state.socket.emit('chatMessage', this.newMsg, getCookie('user-id'), this.getChat);
            await this.$store.state.socket.emit('joinChats', this.getChat, getCookie('user-id'));
            await this.$store.state.socket.emit('getChats', getCookie('user-id'));
        });
    },
    updated() {
        $('.chat').scrollTop = $('.chat').scrollHeight;
    },
}
</script>