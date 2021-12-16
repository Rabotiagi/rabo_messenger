<template>
    <div class="usr" v-on:click="choose">
        <div class="imgg"></div>
        <div class="name">{{user.firstName}}</div>
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
            console.log(event.target);
            event.target.classList.toggle('chosen');
        }
    }
}
</script>