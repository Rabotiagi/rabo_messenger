<template>
    <div>
        <div class='item mess' v-bind:class="message.direction">
            <div class='image'></div>
            <div class='message'>
                <div class='name-time'>
                    <div class='mess-name'>{{message.firstName}}</div>
                    <div class='time'>{{message.time}}</div>
                </div>
                <div class='text' v-if="!message.file">{{message.message}}</div>
                <div class="text-file" v-if="message.file">
                    <a v-bind:href="'http://localhost:3000/database/files/'+message.file">{{message.message}}</a>
                </div>
            </div>
        </div>
        <div class="line" v-if="message.date">{{message.date}}</div>
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