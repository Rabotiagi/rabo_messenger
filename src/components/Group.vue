<template>
    <div class='item' v-on:click="enter($event, group)">{{group.name}}</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import $ from '@/plugins/selector.js';

export default {
    computed: mapGetters(['socket', 'user', 'chat']),
    props: {
        group: {
            type: Object,
            required: true
        }
    },
    methods: {
        ...mapMutations(['setChat']),
        enter: function (event, item) {
            if ($('.active')) {
                $('.active').classList.remove('active');
            }
            event.target.classList.add('active');

            this.setChat(item.chat);
            this.socket.emit('joinChats', this.chat, this.user);
        }
    }
}
</script>

<style scoped>
    .active {border: 2px solid blue}
    .item {text-align: center}
</style>