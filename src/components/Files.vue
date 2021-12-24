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
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import File from '../components/File';

export default {
    data() {
        return {
            files: []
        }
    },
    components: {
        File
    },
    methods: {
        ...mapMutations(['setUser']),
        ev1: function() {
            document.cookie = "user-id=1";
            this.setUser();
        },
        ev2: function() {
            document.cookie = "user-id=2";
            this.setUser();
        }
    }
}
</script>