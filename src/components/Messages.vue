<template>
    <div class="chat">
        <div class="messages">
            <Message 
                v-for="(message, index) in allMessages"
                :key="index"
                v-bind:message="message"
            />
        </div>
        <div class="forms">
            <form class="upload-form" v-on:submit="upload">
                <input type="file" name="file" class="msg-file" required>
                <button type="submit">send file</button>
            </form>
            <form class="message-form" autocomplete="off" v-on:submit="send">
                <input id="message" type="text" placeholder="Write a message...">
                <button type="submit" class="submit-send"></button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Message from '../components/Message';
import $ from '@/plugins/selector.js';

export default {
    computed: mapGetters(['socket', 'user', 'chat', 'message', 'allMessages']),
    components: {
        Message
    },
    methods: {
        ...mapMutations(['setChat', 'setMessage']),
        send: async function (event) {
            event.preventDefault();

            this.setMessage(event.target.elements.message.value);

            if (this.allMessages.length == 0 && this.chat.new) {
                this.socket.emit('createChat', [this.user, this.chat.new]);
            } else {
                this.socket.emit('chatMessage', this.message, this.user, this.chat);
                this.setMessage('');
            }

            event.target.elements.message.value = "";
            event.target.elements.message.focus();
        },
        upload: async function (event) {
            event.preventDefault();

            const file = $('.msg-file').files[0];

            if (file.name.indexOf('_') > -1) {
                alert('file name should not contain "_"');
                return;
            }
            if (file.size > 157286400) {
                alert('max allowed file size is 150 MB');
                return;
            }

            const data = new FormData();
            data.append('file', file);
            data.append('user', this.user);
            data.append('chat', this.chat);

            fetch('/file', {
                method: 'POST',
                body: data
            });

            await this.socket.emit('joinChat', this.chat);
        }
    },
    updated() {
        $('.chat').scrollTop = $('.chat').scrollHeight;
    }
}
</script>
