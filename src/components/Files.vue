<template>
    <div class="files">
        <div class="heading">shared files</div>
        <File 
            v-for="(file, index) in allFiles"
            :key="index"
            v-bind:file="file"
        />

        <div class="delete" v-on:click="deletion">Delete this chat?</div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import File from '../components/File';

export default {
    computed: mapGetters(['socket', 'chat', 'allFiles']),
    components: {
        File
    },
    methods: {
        ...mapMutations(['setChat', 'deleteContact', 'deleteGroup']),
        deletion: async function() {
            const res = confirm(`are you sure you want to delete this chat?`);
            if (res) {
                await this.socket.emit('deleteChat', this.chat);
                this.deleteContact(this.chat);
                this.deleteGroup(this.chat);
                this.setChat(null);
            }
        }
    }
}
</script>
