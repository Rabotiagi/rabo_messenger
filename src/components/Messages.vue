<template>
    <div class="chat">
        <div class="messages">
            <Message 
                v-for="(message, index) in messages"
                :key="index"
                v-bind:message="message"
            />
        </div>
        <form class="message-form" v-on:submit="send">
            <input id="message" type="text" placeholder="Write a message...">
            <button type="submit" class="submit-send"></button>
        </form>
    </div>
</template>

<script>
import Message from '../components/Message';
import $ from '@/plugins/selector.js';
import getCookie from '@/plugins/getCookie.js';
import transformDate from '@/plugins/transformDate.js';

export default {
    data() {
        return {
            messages: []
        }
    },
    components: {
        Message
    },
    created() {
        this.$store.state.socket.on('history', async (data) => {
            data.forEach(item => {
                item.time = transformDate(item.time);
                if($('.active').getAttribute('name') != item.firstName) {
                    item.direction = 'outgoing';
                }
            });
            this.messages = data;
            $('.chat').scrollTop = $('.chat').scrollHeight;
        });

        this.$store.state.socket.on('message', async (data) => {
            data.direction = 'outgoing';
            this.messages.push(data)
            $('.chat').scrollTop = $('.chat').scrollHeight;
        });
    },
    methods: {
        send: function (event) {
            event.preventDefault();

            const message = event.target.elements.message.value;
            this.$store.state.socket.emit('chatMessage', message, getCookie('user-id'), $('.active').id);

            event.target.elements.message.value = "";
            event.target.elements.message.focus();
        }
    }
}
</script>