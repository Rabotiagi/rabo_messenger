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
            console.log(data);
            data.forEach((item, i) => {
                if (data[i+1]) {
                    const date1 = new Date(item.time);
                    const date2 = new Date(data[i+1].time)
                    if(date1.getDay() !== date2.getDay()) {
                        item.date = item.time;
                    }
                }

                item.time = transformDate(item.time);
                if($('.active').getAttribute('name') != item.firstName) {
                    item.direction = 'outgoing';
                }
            })

            this.messages = data;
            console.log(data);
        });

        this.$store.state.socket.on('message', async (data) => {
            console.log(data);
            if($('.active').getAttribute('name') != data.firstName) {
                data.direction = 'outgoing';
            }
            this.messages.push(data)
            console.log('ONO!!');
        });


    },
    updated() {
        $('.chat').scrollTop = $('.chat').scrollHeight;
    },
    methods: {
        send: function (event) {
            event.preventDefault();

            const message = event.target.elements.message.value;

            this.$store.state.socket.on('newChat', async (data) => {
                console.log('before message', data);
                await this.$store.state.socket.emit('chatMessage', message, getCookie('user-id'), data);
                await this.$store.state.socket.emit('joinChats', data, getCookie('user-id'));
                $('.active').id = data;
            });

            if (this.messages.length == 0) {
                console.log('before create', [getCookie('user-id'), $('.active').getAttribute('usr_id')]);
                this.$store.state.socket.emit('createChat', [getCookie('user-id'), +$('.active').getAttribute('usr_id')]);
                console.log(3);
            } else {
                this.$store.state.socket.emit('chatMessage', message, getCookie('user-id'), $('.active').id);
            }

            event.target.elements.message.value = "";
            event.target.elements.message.focus();
        }
    }
}
</script>