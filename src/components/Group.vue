<template>
    <div class='item' v-on:click="enter(group)">
        {{group.name}}
        <div class="azaz" v-if="group.active"></div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    computed: mapGetters(['socket', 'user', 'chat']),
    props: {
        group: {
            type: Object,
            required: true
        }
    },
    methods: {
        ...mapMutations(['setChat', 'setActive']),
        enter: function (item) {
            this.setActive(item.chat);
            this.setChat(item.chat);
            this.socket.emit('joinChats', this.chat, this.user);
        }
    }
}
</script>