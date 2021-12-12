<template>
    <div class="files">
        <div class="heading">shared files</div>
        <File 
            v-for="(file, index) in files"
            :key="index"
            v-bind:file="file"
        />
    </div>
</template>

<script>
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
}
</script>