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
import { mapActions, mapGetters, mapMutations } from "vuex";
import Message from '../components/Message';
import $ from '@/plugins/selector.js';

export default {
    computed: mapGetters(['user', 'chat', 'message', 'allMessages']),
    components: {
        Message
    },
    methods: {
        ...mapActions(['isGroup']),
        ...mapMutations(['setChat', 'setMessage', 'updateMessages', 'addMessage']),
        send: async function (event) {
            event.preventDefault();

            this.setMessage(event.target.elements.message.value);

            if (this.allMessages.length == 0 && this.chat.new) {
                this.$store.state.socket.emit('createChat', [this.user, this.chat.new]);
            } else {
                this.$store.state.socket.emit('chatMessage', this.message, this.user, this.chat);
            }

            event.target.elements.message.value = "";
            event.target.elements.message.focus();
        }
    },
    updated() {
        $('.chat').scrollTop = $('.chat').scrollHeight;
    },
}
</script>