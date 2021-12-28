<template>
    <div class='item contact' v-on:click="enter(contact)">
        <div class='image'></div>
        <div class='name-message'>
            <div class='name'>{{contact.name}}</div>
            <div class='message'>{{contact.msg}}</div>
        </div>
        <div class='date'>{{contact.createdAt}}</div>
        <div class="kek" v-if="contact.active"></div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
//import $ from '@/plugins/selector.js';

export default {
    computed: mapGetters(['socket', 'user', 'chat']),
    props: {
        contact: {
            type: Object,
            required: true
        }
    },
    methods: {
        ...mapMutations(['setChat', 'updateMessages', 'setActive']),
        enter: function (item) {
            if (item.chat == null) {
                this.setActive(item.id)
                this.setChat({new: item.id});
                this.updateMessages([]);
                return;
            }
            this.setActive(item.chat);
            this.setChat(item.chat);
            this.socket.emit('joinChats', this.chat, this.user);
        }
    }
}
</script>

<style scoped>
.kek {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #5893F733;
    border-left: 2px solid rgba(88, 147, 247, .6);
}
</style>