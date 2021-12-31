<template>
    <div class="create-group disabled">
        <div class="line">
            <div class="butt" v-on:click="close">Cancel</div>
            <div class="title">Create a new group</div>
            <div class="butt" v-on:click="create">Create</div>
        </div>
        <div class="line">
            <div class="inputs">
                <input class="name-input" type="text" placeholder="Name of the group">
                <form>
                    <input type="text" placeholder="Search for users to add">
                </form>
            </div>
            <div class="photo">
                <span class="preview"></span>
                <p>Pick a photo</p>
            </div>
        </div>
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
import { mapGetters, mapMutations } from 'vuex';
import GroupsFormUser from '@/components/GroupsFormUser';
import $ from '@/plugins/selector.js';

export default ({
    computed: mapGetters(['socket', 'user', 'allContacts', 'chosenUsers']),
    components: {
        GroupsFormUser
    },
    methods: {
        ...mapMutations(['updateChosenUsers']),
        create: function () {
            const name = $('.name-input').value;
            if (!name) {
                alert('enter the name');
                return;
            }

            const ids = [this.user];
            this.chosenUsers.forEach(item => {
                ids.push(item.id);
            })
            if  (ids.length < 3) {
                alert('select at least 2 users');
                return;
            }
            
            this.socket.emit('createChat', ids, name);
            this.close();
        },
        close: function () {
            $('.create-group').classList.add('disabled');
            $('.name-input').value = '';
            this.updateChosenUsers([]);
            document.querySelectorAll('.chosen').forEach(item => {
                item.classList.remove('chosen');
            })
        }
    }
})
</script>
