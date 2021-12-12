<template>
    <div class='item mess' v-bind:class="message.direction">
        <div class='image'></div>
        <div class='message'>
            <div class='name-time'>
                <div class='mess-name'>{{message.firstName}}</div>
                <div class='time'>{{message.time}}</div>
            </div>
            <div class='text'>{{message.message}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: Object,
            required: true
        }
    }
}
</script>