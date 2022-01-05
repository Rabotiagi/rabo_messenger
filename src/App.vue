<template>
    <div id="app">
        <Groups />
        <GroupsFrom />
        <Contacts />
        <Messages v-if="chat" />
        <Files v-if="chat" />
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Groups from '@/components/Groups.vue';
import GroupsFrom from '@/components/GroupsFrom.vue';
import Contacts from '@/components/Contacts.vue';
import Messages from '@/components/Messages.vue';
import Files from '@/components/Files.vue';
import downloadFile from '@/plugins/downloadFile.js';

export default {
    computed: mapGetters([
        'socket', 
        'user',
        'chat', 
        'message',
        'allContacts',
        'allFiles'
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
        'setUserInfo',
        'setChat',
        'setMessage',
        'updateGroups', 
        'updateOneGroup',
        'updateContacts',
        'updateOneContact',
        'setActive', 
        'updateSearch', 
        'updateMessages', 
        'addMessage',
        'updateFiles',
        'connectFilesToMessages',
        'connectPhotosToMessages',
        'setNotify'
    ]),
    created() {
        this.setUser();
        this.socket.emit('setUserId', this.user);
        this.socket.emit('getUserPhoto', this.user);
        const audio = new Audio("https://freesound.org/data/previews/458/458586_5121236-lq.mp3");

        this.socket.on('photo', (data) => {
            this.setUserInfo(data);
        });

        this.socket.on('refreshChats', (data) => {
            this.updateOneGroup(data);
            this.updateOneContact(data);

            if (this.chat !== data.chat) {
                this.setNotify(data);
                audio.play();
            }
        });

        this.socket.on('chats', (data) => {
            this.updateContacts(data);
            this.updateGroups(data);
            this.setActive(this.chat);
        });

        this.socket.on('show users', (data) => {
            this.updateSearch(data);
        });

        this.socket.on('history', (messages, files) => {
            this.updateMessages(messages);
            this.updateFiles(files);
            this.connectFilesToMessages();
            this.connectPhotosToMessages();
        });

        // rewrite
        this.socket.on('message', (data, chat) => {
            if (this.chat == chat) {
                this.addMessage(data);
                if (data.message == '') {
                    this.socket.emit('joinChats', this.chat, this.user);
                }
            }
            this.connectPhotosToMessages();
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

        this.socket.on('file', async (data) => {
            downloadFile(data);
        });
    }
}
</script>

<style>
@import './assets/style.css';
</style>
