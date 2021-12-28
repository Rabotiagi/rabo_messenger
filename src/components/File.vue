<template>
    <div class="item file" v-on:click="download(file)">
        <div class="icon"></div>
        <div class="name">{{file.fileName}}</div>
        <div class="size">{{file.size}}</div>
        <div class="date">{{file.date}}</div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    computed: mapGetters(['socket']),
    props: {
        file: {
            type: Object,
            required: true
        }
    },
    methods: {
        ...mapMutations([]),    
        download: function (item) {
            this.socket.emit('getFile', item.fileId);
        }
    }
}
</script>