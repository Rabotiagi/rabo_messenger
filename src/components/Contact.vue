<template>
    <div class='item contact' v-bind:id="contact.fromConv" v-bind:name="contact.firstName" v-on:click="enter">
        <div class='image'></div>
        <div class='name-message'>
            <div class='name' v-bind:id="contact.firstName">{{contact.firstName}}</div>
            <div class='message'>{{contact.msg}}</div>
        </div>
        <div class='date'>{{contact.createdAt}}</div>
    </div>
</template>

<script>
import $ from '@/plugins/selector.js';
import getCookie from '@/plugins/getCookie.js';

export default {
    props: {
        contact: {
            type: Object,
            required: true
        }
    },
    methods: {
        enter: function (event) {
            if ($('.active')) {
                $('.active').classList.remove('active');
            }
            event.target.classList.add('active');
            this.$store.state.socket.emit('joinChats', event.target.id, getCookie('user-id'));
        }
    }
}
</script>