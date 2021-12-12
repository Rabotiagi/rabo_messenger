<template>
    <div id="app">
        <Groups />
        <Contacts />
        <Messages />
        <Files />
    </div>
</template>

<script>
import Groups from '@/components/Groups.vue';
import Contacts from '@/components/Contacts.vue';
import Messages from '@/components/Messages.vue';
import Files from '@/components/Files.vue';

export default {
    name: 'App',
    components: {
        Groups,
        Contacts,
        Messages,
        Files
    }
}
</script>

<style>
@import './assets/style.css';
</style>
