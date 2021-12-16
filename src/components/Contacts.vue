<template>
    <div class="contacts">
        <form class="search-form" autocomplete="off" v-on:submit="search">
            <input id="name" type="text" placeholder="Search...">
            <button type="submit" class="submit-search"></button>
        </form>
        <div class="heading srch">search results <span class="srch-close" v-on:click="hide"></span></div>
        <Contact
            v-for="(contact, index) of search_res"
            :key="index+100"
            v-bind:contact="contact"
        />
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
import $ from '@/plugins/selector.js';
import getCookie from '@/plugins/getCookie.js';
import transformDate from '@/plugins/transformDate.js';

export default {
    data() {
        return {
            search_res: [],
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

        this.$store.state.socket.on('show users', async (data) => {
            console.log(data);
            this.search_res = data;
        });
    },
    methods: {
        search: function (event) {
            event.preventDefault();

            $('.srch').style.display = 'flex';
            const name = event.target.elements.name.value;
            this.$store.state.socket.emit('findUsers', name, getCookie('user-id'));
        },
        hide: function (event) {
            event.target.closest("div").style.display = 'none';
            this.search_res = [];
        }
    }
}
</script>