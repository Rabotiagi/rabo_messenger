<template>
    <div class="create-group inviz">
        <div class="sub" v-on:click="create">Submit</div>
        <input class="name-input" type="text" placeholder="Name">
        <div class="heading">select user to add to a new group</div>
        <div class="users">
            <GroupsFormUser
                v-for="(user, index) of allContacts"
                :key="index+200"
                v-bind:user="user"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GroupsFormUser from '@/components/GroupsFormUser';
import $ from '@/plugins/selector.js';

export default ({
    computed: mapGetters(['socket', 'user', 'allContacts']),
    components: {
        GroupsFormUser
    },
    methods: {
        create: function () {
            const name = $('.name-input').value;
            const ids = [this.user]
            document.querySelectorAll('.chosen').forEach(item => {
                ids.push(+item.getAttribute('usr_id'));
            })
            this.socket.emit('createChat', ids, name);
        }
    }
})
</script>
