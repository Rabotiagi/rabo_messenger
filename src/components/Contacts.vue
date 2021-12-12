<template>
    <div class="contacts">
        <form class="search-form">
            <input id="name" type="text" placeholder="Search...">
            <button type="submit" class="submit-search"></button>
        </form>
        <div class="heading">direct messages</div>
        <Contact
            v-for="(contact, index) of contacts"
            :key="index"
            v-bind:contact="contact"
        />
    </div> 
</template>

<script>
import Contact from '@/components/Contact';
import getCookie from '@/plugins/getCookie.js';
import transformDate from '@/plugins/transformDate.js';

export default {
    data() {
        return {
            contacts: []
        }
    },
    components: {
        Contact
    },
    created() {
        this.$store.state.socket.emit('getChats', getCookie('user-id'));

        this.$store.state.socket.on('chats', async (data) => {
            data.forEach(item => {
                item.createdAt = transformDate(item.createdAt);
            });
            this.contacts = data;
        });
    }
}
</script>