<template>
    <div id="app">
        <Groups />
        <GroupsFrom />
        <Contacts />
        <Messages />
        <Files />
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Groups from '@/components/Groups.vue';
import GroupsFrom from '@/components/GroupsFrom.vue';
import Contacts from '@/components/Contacts.vue';
import Messages from '@/components/Messages.vue';
import Files from '@/components/Files.vue';

export default {
    computed: mapGetters([
        'socket', 
        'user',
        'chat', 
        'message',
        'allContacts'
    ]),
    name: 'App',
    components: {
        Groups,
        GroupsFrom,
        Contacts,
        Messages,
        Files
    },
    methods: mapMutations([
        'setUser', 
        'setChat',
        'updateGroups', 
        'updateContacts', 
        'updateSearch', 
        'updateMessages', 
        'addMessage',
        'updateLastMessage'
    ]),
    async created() {
        this.setUser();

        await this.socket.on('refreshChats', () => {
            this.socket.emit('getChats', this.user);
        });

        await this.socket.on('chats', (data) => {
            this.updateContacts(data);
            this.updateGroups(data);
        });

        await this.socket.on('show users', (data) => {
            this.updateSearch(data);
        });

        await this.socket.on('history', (data) => {
            this.updateMessages(data);
        });

        this.socket.on('message', (data) => {
            this.addMessage(data);
        });

        // rewrite
        await this.socket.on('newChat', async (id, users) => {
            this.setChat(id);
            await this.socket.emit('getChats', this.user);
            if (users.length < 3) {
                await this.socket.emit('chatMessage', this.message, this.user, this.chat);
            }
            await this.socket.emit('joinChats', this.chat, this.user);    
        });
    }
}
</script>

<style>
@import './assets/style.css';
</style>
