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
        'setMessage',
        'updateGroups', 
        'updateOneGroup',
        'updateContacts',
        'updateOneContact', 
        'updateSearch', 
        'updateMessages', 
        'addMessage'
    ]),
    created() {
        this.setUser();
        this.socket.emit('setUserId', this.user);

        this.socket.on('refreshChats', (data) => {
            this.updateOneGroup(data);
            this.updateOneContact(data);
        });

        this.socket.on('chats', (data) => {
            this.updateContacts(data);
            this.updateGroups(data);
        });

        this.socket.on('show users', (data) => {
            this.updateSearch(data);
        });

        this.socket.on('history', (data) => {
            this.updateMessages(data);
        });

        this.socket.on('message', (data, chat) => {
            if (this.chat == chat) {
                this.addMessage(data);
            }
        });

        // rewrite
        this.socket.on('newChat', async (id, users) => {
            if (this.message) {
                this.setChat(id);
                if (users.length < 3) {
                    await this.socket.emit('chatMessage', this.message, this.user, this.chat);
                    this.setMessage('');
                }
                await this.socket.emit('joinChats', this.chat, this.user);
            }
            await this.socket.emit('getChats', this.user);    
        });
    }
}
</script>

<style>
@import './assets/style.css';
</style>
