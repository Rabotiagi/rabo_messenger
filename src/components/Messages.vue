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
        <form class="upload-form" v-on:submit="upload">
            <input type="file" name="avatar"/>
            <button type="submit">upload</button>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Message from '../components/Message';
import $ from '@/plugins/selector.js';

export default {
    computed: mapGetters(['socket', 'user', 'chat', 'message', 'allMessages']),
    components: {
        Message
    },
    methods: {
        ...mapActions(['isGroup']),
        ...mapMutations(['setChat', 'setMessage']),
        send: async function (event) {
            event.preventDefault();

            if (!event.target.elements.message.value) {
                alert('vvedi soobschenie dayn');
                return;
            }

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

            const input = document.querySelector('input[type="file"]');
            const data = new FormData()
            data.append('file', input.files[0])
            data.append('user', this.chat)

            await fetch('/upload', {
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                body: data
            })
        }
    },
    updated() {
        $('.chat').scrollTop = $('.chat').scrollHeight;
    },
}
</script>

<style scoped>
.chat .upload-form {
    position: absolute;
    right: 24px;
    bottom: 100px;
}
.chat .upload-form input {
    color: #fff;
}
</style>