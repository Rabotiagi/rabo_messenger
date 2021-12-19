<template>
    <div class="usr" v-bind:usr_id="user.id" v-on:click="choose">
        <div class="imgg"></div>
        <div class="name">{{user.name}}</div>
    </div>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    methods: {
        choose: function (event) {
            event.target.classList.toggle('chosen');
        }
    }
}
</script>