<template>
    <div class="groups">
        <Group 
            v-for="(group, index) in allGroups"
            :key="index"
            v-bind:group="group"
        />
        <div class="item add" v-on:click="toggle"><span class="icon"></span></div>
        <div class="item account"></div>

        <div class="create-group inviz">
            <div class="item add" v-on:click="toggle"><span class="icon"></span></div>
            <div class="item add sub" v-on:click="create">Submit</div>
            <form class="search-form" autocomplete="off" v-on:submit="search">
                <input id="name" type="text" placeholder="Search...">
                <button type="submit" class="submit-search"></button>
            </form>
            <input class="name-input" type="text" placeholder="Name">
            <div class="heading">select user to add to a new group</div>
            <div class="users">
                <User
                    v-for="(user, index) of allContacts"
                    :key="index+200"
                    v-bind:user="user"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Group from '@/components/Group';
import User from '@/components/User'
import $ from '@/plugins/selector.js';

export default {
    computed: mapGetters(['user', 'allGroups', 'allContacts']),
    components: {
        Group,
        User
    },
    methods: {
        ...mapMutations(['updateGroups', 'updateContacts']),
        toggle: function () {
            $('.create-group').classList.toggle('inviz');

            this.$store.state.socket.emit('getChats', this.user);

            this.$store.state.socket.on('chats', async (data) => {
                this.updateContacts(data);
            });
        },
        search: function (event) {
            event.preventDefault();

            $('.srch').style.display = 'flex';
            const name = event.target.elements.name.value;
            this.$store.state.socket.emit('findUsers', name, this.user);
        },
        create: async function () {
            const name = $('.name-input').value;
            const ids = [this.user]
            document.querySelectorAll('.chosen').forEach(item => {
                ids.push(+item.getAttribute('usr_id'));
            })
            await this.$store.state.socket.emit('createChat', ids, name);
        }
    }
}
</script>