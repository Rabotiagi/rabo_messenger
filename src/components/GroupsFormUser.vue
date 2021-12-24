<template>
    <div class="user" v-on:click="choose($event, user)">
        <div class="img"></div>
        <div class="name">{{user.name}}</div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    methods: {
        ...mapMutations(['chooseUser']),
        choose: function (event, user) {
            event.target.classList.toggle('chosen');
            this.chooseUser(user);
        }
    }
}
</script>
