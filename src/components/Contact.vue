<template>
    <div class='item contact' v-on:click="enter($event, contact)">
        <div class='image'></div>
        <div class='name-message'>
            <div class='name'>{{contact.name}}</div>
            <div class='message'>{{contact.msg}}</div>
        </div>
        <div class='date'>{{contact.createdAt}}</div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import $ from '@/plugins/selector.js';

export default {
    computed: mapGetters(['socket', 'user', 'chat']),
    props: {
        contact: {
            type: Object,
            required: true
        }
    },
    methods: {
        ...mapMutations(['setChat', 'updateMessages']),
        enter: function (event, item) {
            if ($('.active')) {
                $('.active').classList.remove('active');
            }
            event.target.classList.add('active');

            if (item.chat != null) {
                this.setChat(item.chat);
                this.socket.emit('joinChats', this.chat, this.user);
            } else {
                this.setChat({new: item.id});
                this.updateMessages([]);
            }
        }
    }
}
</script>