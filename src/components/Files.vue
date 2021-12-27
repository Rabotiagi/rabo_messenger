<template>
    <div class="files">
        <div class="heading">shared files</div>
        <File 
            v-for="(file, index) in files"
            :key="index"
            v-bind:file="file"
        />
        <button v-on:click="ev1">1</button>
        <button v-on:click="ev2">2</button>

        <div class="delete" v-on:click="deletion">Delete this chat?</div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import File from '../components/File';

export default {
    computed: mapGetters(['socket', 'chat']),
    data() {
        return {
            files: []
        }
    },
    components: {
        File
    },
    methods: {
        ...mapMutations(['setUser', 'updateMessages', 'deleteContact']),
        ev1: function() {
            document.cookie = "user-id=1";
            this.setUser();
        },
        ev2: function() {
            document.cookie = "user-id=2";
            this.setUser();
        },
        deletion: async function() {
            const res = confirm(`are you sure you want to delete this chat?`);
            if (res) {
                await this.socket.emit('deleteChat', this.chat);
                this.deleteContact(this.chat);
                this.updateMessages([]);
            }
        }
    }
}
</script>

<style scoped>
.files .delete {
    position:absolute;
    bottom: 32px;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, .25);
    text-transform: uppercase;
    cursor: pointer;
}
.files .delete:hover {
    color: rgba(255, 255, 255, 0.808);
}
</style>