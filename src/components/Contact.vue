<template>
    <div class='item contact' v-on:click="enter(contact)">
        <img src="http://localhost:3000/database/photos/1641330428704_1640862233-1.jpg" alt="photo" class='image'>
        <div class='name-message'>
            <div class='name'>{{contact.name}}</div>
            <div class='message' v-if="contact.msg">{{contact.msg}}</div>
            <div class='message file' v-if="!contact.msg && contact.chat"><em>attached file</em></div>
        </div>
        <div class='date'>{{contact.createdAt}}</div>
        <div class="azaz" v-if="contact.active"></div>
        <div class="azazaz" v-if="contact.notify"></div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    computed: mapGetters(['socket', 'user', 'chat']),
    props: {
        contact: {
            type: Object,
            required: true
        }
    },
    methods: {
        ...mapMutations(['setChat', 'updateMessages', 'updateFiles', 'setActive', 'removeNotify']),
        enter: function (item) {
            if (item.chat == null) {
                this.setActive(item.id)
                this.setChat({new: item.id});
                this.updateMessages([]);
                this.updateFiles([]);
                return;
            }
            this.setActive(item.chat);
            this.setChat(item.chat);
            this.removeNotify(item);
            this.socket.emit('joinChats', this.chat, this.user);
        }
    }
}
</script>
