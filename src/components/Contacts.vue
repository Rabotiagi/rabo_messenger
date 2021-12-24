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
import compare from '@/plugins/compare.js';

export default {
    computed: mapGetters(['socket', 'user', 'allContacts', 'searchResults']),
    components: {
        Contact
    },
    methods: {
        ...mapMutations(['updateGroups', 'updateContacts', 'updateSearch']),
        search: function (event) {
            event.preventDefault();

            $('.srch').style.display = 'flex';
            const name = event.target.elements.name.value;
            this.$store.state.socket.emit('findUsers', name, this.user);
        },
        hide: function (event) {
            event.target.closest("div").style.display = 'none';
            this.updateSearch([]);
        }
    },
    created() {
        this.socket.emit('getChats', this.user);   
        
    },
    updated() {
        compare(this.allContacts, this.searchResults);
    }
}
</script>