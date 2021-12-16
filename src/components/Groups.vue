<template>
    <div class="groups">
        <Group 
            v-for="(group, index) in groups"
            :key="index"
            v-bind:group="group"
        />
        <div class="item add" v-on:click="toggle"><span class="icon"></span></div>
        <div class="item account"></div>

        <div class="create-group inviz">
            <div class="item add" v-on:click="toggle"><span class="icon"></span></div>
            <div class="item add sub" v-on:click="toggle">Submit</div>
            <form class="search-form" autocomplete="off" v-on:submit="search">
                <input id="name" type="text" placeholder="Search...">
                <button type="submit" class="submit-search"></button>
            </form>
            <div class="heading">select user to add to a new group</div>
            <div class="users">
                <User
                    v-for="(user, index) of users"
                    :key="index+200"
                    v-bind:user="user"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Group from '@/components/Group';
import User from '@/components/User'
import $ from '@/plugins/selector.js';
import getCookie from '@/plugins/getCookie.js';

export default {
    data() {
        return {
            groups: [],
            users: []
        }
    },
    components: {
        Group,
        User
    },
    methods: {
        toggle: function () {
            $('.create-group').classList.toggle('inviz');

            this.$store.state.socket.emit('getChats', getCookie('user-id'));

            this.$store.state.socket.on('chats', async (data) => {
                this.users = data;
                console.log(data);
            });
        },
        search: function (event) {
            event.preventDefault();

            $('.srch').style.display = 'flex';
            const name = event.target.elements.name.value;
            this.$store.state.socket.emit('findUsers', name, getCookie('user-id'));
        },
    }
}
</script>

<style scoped>

</style>