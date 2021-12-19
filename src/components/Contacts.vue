<template>
    <div class="contacts">
        <form class="search-form" autocomplete="off" v-on:submit="search">
            <input id="name" type="text" placeholder="Search...">
            <button type="submit" class="submit-search"></button>
        </form>
        <div class="heading srch">
            search results
            <span class="srch-close" v-on:click="hide"></span>
        </div>
        <Contact
            v-for="contact of searchResults"
            :key="contact.chat"
            v-bind:contact="contact"
        />
        <div class="heading">direct messages</div>
        <Contact
            v-for="contact of allContacts"
            :key="contact.chat + 100"
            v-bind:contact="contact"
            :ref="contact.id"
        />
    </div> 
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Contact from '@/components/Contact';
import $ from '@/plugins/selector.js';
import getCookie from '@/plugins/getCookie.js';
import compare from '@/plugins/compare.js';

export default {
    computed: mapGetters(['allContacts', 'searchResults']),
    components: {
        Contact
    },
    methods: {
        ...mapMutations(['updateContacts', 'updateSearch']),
        search: function (event) {
            event.preventDefault();

            $('.srch').style.display = 'flex';
            const name = event.target.elements.name.value;
            this.$store.state.socket.emit('findUsers', name, getCookie('user-id'));
        },
        hide: function (event) {
            event.target.closest("div").style.display = 'none';
            this.updateSearch([]);
        }
    },
    async created() {
        this.$store.state.socket.emit('getChats', getCookie('user-id'));

        await this.$store.state.socket.on('chats', async (data) => {
            this.updateContacts(data);
        });

        this.$store.state.socket.on('show users', async (data) => {
            this.updateSearch(data);
        });

        this.$store.state.socket.on('refreshChats', async () => {
            this.$store.state.socket.emit('getChats', getCookie('user-id'));
        });
    },
    updated() {
        compare(this.allContacts, this.searchResults);
    }
}
</script>